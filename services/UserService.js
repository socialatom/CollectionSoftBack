const AWS = require("aws-sdk");

function UserService(opts) {
  Object.assign(this, opts);
}

UserService.prototype = {
  doesUserExist,
  createUser,
  getUser,
  listUsersInGroup,
  getUserGroups,
  addUserToGroup,
  deleteUser
};

async function doesUserExist(userPoolId, userEmail) {
  let checkUserParams = {
    UserPoolId: userPoolId,
    Filter: 'email="' + userEmail + '"',
    Limit: 1
  };
  var cognitoClient = new AWS.CognitoIdentityServiceProvider({ apiVersion: "2016-04-18" });
  const users = await cognitoClient.listUsers(checkUserParams).promise();
  if (users.Users.length > 0) {
    return true;
  } else {
    return false;
  }
}

async function createUser(userPoolId, userEmail) {
  let createUserParams = {
    UserPoolId: userPoolId,
    Username: userEmail,
    DesiredDeliveryMediums: ["EMAIL"],
    ForceAliasCreation: false,
    UserAttributes: [
      {
        Name: "email" /* required */,
        Value: userEmail
      }
    ]
  };
  var cognitoClient = new AWS.CognitoIdentityServiceProvider({ apiVersion: "2016-04-18" });
  const user = await cognitoClient.adminCreateUser(createUserParams).promise();
  return user.User;
}

async function listUsersInGroup(userPoolId, groupName) {
  let listUsersParams = {
    GroupName: groupName,
    Limit: 60,
    UserPoolId: userPoolId
  };

  //TODO INCREASE THE LIMIT AND IMPLEMENT PAGING

  console.log(listUsersParams);
  var cognitoClient = new AWS.CognitoIdentityServiceProvider({ apiVersion: "2016-04-18" });
  const result = await cognitoClient.listUsersInGroup(listUsersParams).promise();
  return result.Users;
}

async function getUser(userPoolId, userSub) {
  let userParams = {
    UserPoolId: userPoolId,
    Filter: 'sub="' + userSub + '"',
    Limit: 1
  };
  var cognitoClient = new AWS.CognitoIdentityServiceProvider({ apiVersion: "2016-04-18" });
  const users = await cognitoClient.listUsers(userParams).promise();
  return users.Users[0];
}

async function getUserGroups(userPoolId, userName) {
  let userGroupParams = {
    UserPoolId: userPoolId,
    Username: userName
  };
  var cognitoClient = new AWS.CognitoIdentityServiceProvider({ apiVersion: "2016-04-18" });
  const data = await cognitoClient.adminListGroupsForUser(userGroupParams).promise();
  return data.Groups;
}

async function addUserToGroup(groupName, userPoolId, userName) {
  let addUserToGrouParams = {
    GroupName: groupName,
    UserPoolId: userPoolId,
    Username: userName
  };

  var cognitoClient = new AWS.CognitoIdentityServiceProvider({ apiVersion: "2016-04-18" });
  await cognitoClient.adminAddUserToGroup(addUserToGrouParams).promise();
}

async function deleteUser(userPoolId, userName) {
  let deleteUserParams = {
    UserPoolId: userPoolId,
    Username: userName
  };
  var cognitoClient = new AWS.CognitoIdentityServiceProvider({ apiVersion: "2016-04-18" });
  const user = await cognitoClient.adminDeleteUser(deleteUserParams).promise();
  return user.User;
}

export default UserService;
