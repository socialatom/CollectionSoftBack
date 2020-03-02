import * as dynamoDBLib from "../util/dynamodb-lib";

function StudentProfileService(opts) {
  Object.assign(this, opts);
}

StudentProfileService.prototype = {
  listStudentProfiles,
  studentProfile,
  updateStudentProfile,
  deleteStudentProfile
};

async function listStudentProfiles() {
  const StudentProfilesTableName = process.env.studentProfilesTableName;
  const call = "scan";
  const params = {
    TableName: StudentProfilesTableName
  };
  const result = await dynamoDBLib.call(call, params);
  return result.Items;
}

async function studentProfile(studentProfileId) {
  const StudentProfilesTableName = process.env.studentProfilesTableName;
  const call = "get";
  const params = {
    TableName: StudentProfilesTableName,
    Key: {
      studentProfileId: studentProfileId
    }
  };
  const result = await dynamoDBLib.call(call, params);
  return result.Item;
}

async function deleteStudentProfile(studentProfileId) {
  const StudentProfilesTableName = process.env.studentProfilesTableName;
  const call = "delete";
  const params = {
    TableName: StudentProfilesTableName,
    Key: {
      studentProfileId: studentProfileId
    }
  };
  const result = await dynamoDBLib.call(call, params);
  return result.Item;
}

async function updateStudentProfile(studentProfileId, studentProfileObject) {
  const StudentProfilesTableName = process.env.studentProfilesTableName;
  let existingItem = await studentProfile(studentProfileId);
  const call = "put";
  let params = {
    TableName: StudentProfilesTableName,
    Key: {
      studentProfileId: studentProfileId
    }
  };
  if (existingItem === undefined) {
    params.Item = studentProfileObject;
    params.Item.studentProfileId = studentProfileId;
  } else {
    for (var property in studentProfileObject) {
      if (!studentProfileObject[property] || property === "studentProfileId") {
        continue;
      }
      existingItem[property] = studentProfileObject[property];
    }
    params.Item = existingItem;
    params.Item.studentProfileId = studentProfileId;
  }
  await dynamoDBLib.call(call, params);
  return params.Item;
}

export default StudentProfileService;
