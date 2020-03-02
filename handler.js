import { success, unauthorized, failure } from "./util/response-lib";

import UserService from "./services/UserService";
import StudentProfileService from "./services/StudentProfileService";
import StaffProfileService from "./services/StaffProfileService";
import StudentISAService from "./services/StudentISAService";

import StaffModel from "./models/StaffModel";
import CreateStaffModel from "./models/CreateStaffModel";
import UpdateStaffModel from "./models/UpdateStaffModel";
import StudentModel from "./models/StudentModel";
import CreateStudentModel from "./models/CreateStudentModel";
import UpdateStudentModel from "./models/UpdateStudentModel";
//import StudentISAModel from "./models/StudentISAModel";
import CreateStudentISAModel from "./models/CreateStudentISAModel";
import UpdateStudentISAModel from "./models/UpdateStudentISAModel";

const studentProfileService = new StudentProfileService();
const studentISAService = new StudentISAService();
const staffProfileService = new StaffProfileService();
const userService = new UserService();

// Group Names

const StaffUserGroupName = process.env.staffUserGroupName;
const StaffAdminUserGroupName = process.env.staffAdminUserGroupName;
const StudentUserGroupName = process.env.studentUserGroupName;

// HELPER FUNCTIONS

function parseAuthProvider(event) {
  const authProvider = event.requestContext.identity.cognitoAuthenticationProvider;
  const parts = authProvider.split(":");
  const userPoolIdParts = parts[parts.length - 3].split("/");
  const userPoolId = userPoolIdParts[userPoolIdParts.length - 1];
  const userSub = parts[parts.length - 1];
  return { userPoolId: userPoolId, userSub: userSub };
}

async function getUserDetails(event) {
  const { userPoolId, userSub } = parseAuthProvider(event);
  const user = await userService.getUser(userPoolId, userSub);
  const userName = user.Username;

  const userGroupResults = await userService.getUserGroups(userPoolId, userName);
  const userGroups = userGroupResults.map(function(userGroup) {
    return userGroup.GroupName;
  });

  const isStaffUser = userGroups.includes(StaffUserGroupName);
  const isStaffAdminUser = userGroups.includes(StaffAdminUserGroupName);
  const isStudentUser = userGroups.includes(StudentUserGroupName);
  return {
    user: user,
    userPoolId: userPoolId,
    userSub: userSub,
    userGroups: userGroups,
    isStaffUser: isStaffUser,
    isStaffAdminUser: isStaffAdminUser,
    isStudentUser: isStudentUser
  };
}

// LAMBDAS

// Universal Calls

export async function user(event, context) {
  try {
    const { user, userSub, isStaffUser, isStaffAdminUser, isStudentUser } = await getUserDetails(event);
    const result = {
      userId: userSub
    };

    result.userAttributes = user.Attributes;
    result.userStatus = user.UserStatus;
    result.userCreateDate = user.UserCreateDate;
    result.userEnabled = user.Enabled;
    result.userStatus = user.UserStatus;

    if (isStaffAdminUser) {
      result.userGroup = StaffAdminUserGroupName;
    } else if (isStaffUser) {
      result.userGroup = StaffUserGroupName;
    } else if (isStudentUser) {
      result.userGroup = StudentUserGroupName;
    } else {
      result.userGroup = "unknown";
    }

    if (isStaffUser || isStaffAdminUser) {
      const staffProfileId = userSub;
      const staffProfile = await staffProfileService.staffProfile(staffProfileId);
      if (staffProfile !== undefined) {
        result.userFirstName = staffProfile.staffFirstName;
        result.userLastName = staffProfile.staffLastName;
      }
    } else if (isStudentUser) {
      const studentProfileId = userSub;
      const studentProfile = await studentProfileService.studentProfile(studentProfileId);
      if (studentProfile !== undefined) {
        result.userFirstName = studentProfile.studentFirstName;
        result.userLastName = studentProfile.studentLastName;
      }
      result.userFirstName = studentProfile.studentFirstName;
      result.userLastName = studentProfile.studentLastName;
    }

    return success({ result: JSON.stringify(result) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function dashboard(event, context) {
  return user(event, context);
}

export async function listStaff(event, context) {
  try {
    const { userSub, isStaffAdminUser } = await getUserDetails(event);
    if (!isStaffAdminUser) {
      return unauthorized({ result: "Caller is not a staff admin user" });
    }

    const result = await staffProfileService.listStaffProfiles();
    const resultWithoutOwnProfile = result.filter(function(staffProfile) {
      return staffProfile.staffProfileId !== userSub;
    });
    return success({ result: JSON.stringify(resultWithoutOwnProfile) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function createStaff(event, context) {
  try {
    const { userPoolId, isStaffAdminUser } = await getUserDetails(event);
    if (!isStaffAdminUser) {
      return unauthorized({ result: "Caller is not a staff admin user" });
    }

    const data = JSON.parse(event.body);
    const createStaffModel = new CreateStaffModel(data);
    const newUserEmail = createStaffModel.staffEmail;

    const userExists = await userService.doesUserExist(userPoolId, newUserEmail);
    if (userExists) {
      return failure({
        message: "User Already Exists with email",
        email: newUserEmail
      });
    }

    const userCreationResults = await userService.createUser(userPoolId, newUserEmail);
    const userName = userCreationResults.Username;
    await userService.addUserToGroup(StaffUserGroupName, userPoolId, userName);

    const staffProfileId = userName;
    data.staffProfileId = staffProfileId;
    const staffModel = new StaffModel(data);

    const result = await staffProfileService.updateStaffProfile(staffProfileId, staffModel);
    return success({ result: JSON.stringify(result) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function getStaff(event, context) {
  try {
    const staffProfileId = event.pathParameters.staffId;
    const { userPoolId, isStaffAdminUser, userSub } = await getUserDetails(event);
    if (!isStaffAdminUser && userSub !== staffProfileId) {
      return unauthorized({
        result: "Caller is not a staff admin user and this is not a call for own profile"
      });
    }

    const user = await userService.getUser(userPoolId, staffProfileId);
    if (user == undefined) {
      return failure({
        message: "Could not find staff user with id",
        staffId: staffProfileId
      });
    }

    const result = await staffProfileService.staffProfile(staffProfileId);
    return success({ result: result });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function updateStaff(event, context) {
  try {
    const staffProfileId = event.pathParameters.staffId;
    const { userSub, userPoolId, isStaffAdminUser } = await getUserDetails(event);
    if (!isStaffAdminUser && userSub !== staffProfileId) {
      return unauthorized({
        result: "Caller is not a staff admin user and this is not a call for own profile"
      });
    }

    const user = await userService.getUser(userPoolId, staffProfileId);
    if (user == undefined) {
      return failure({
        message: "Could not find staff user with id",
        staffId: staffProfileId
      });
    }

    const data = JSON.parse(event.body);
    const updateStaffModel = new UpdateStaffModel(data);
    updateStaffModel.staffProfileId = staffProfileId;

    //TODO: Check if we are actually updating a staff user and not a student user

    const result = await staffProfileService.updateStaffProfile(staffProfileId, updateStaffModel);
    return success({ result: JSON.stringify(result) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function deleteStaff(event, context) {
  try {
    const staffProfileId = event.pathParameters.staffId;
    const { userSub, userPoolId, isStaffAdminUser } = await getUserDetails(event);
    if (!isStaffAdminUser) {
      return unauthorized({ result: "Caller is not a staff admin user" });
    }

    if (staffProfileId === userSub) {
      return failure({
        message: "Cannot delete yourself with this call"
      });
    }

    const user = await userService.getUser(userPoolId, staffProfileId);
    if (user == undefined) {
      return failure({
        message: "Could not find staff user with id",
        staffId: staffProfileId
      });
    }

    //TODO: Check if we are actually deleting a staff user

    await userService.deleteUser(userPoolId, staffProfileId);
    const result = await staffProfileService.deleteStaffProfile(staffProfileId);
    return success({ result: JSON.stringify(result) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function listStudents(event, context) {
  try {
    const { isStaffAdminUser, isStaffUser } = await getUserDetails(event);
    if (!isStaffAdminUser && !isStaffUser) {
      return unauthorized({
        result: "Caller is not a staff admin user or a staff user"
      });
    }

    const result = await studentProfileService.listStudentProfiles();
    return success({ result: JSON.stringify(result) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function createStudent(event, context) {
  try {
    const { userPoolId, isStaffAdminUser, isStaffUser } = await getUserDetails(event);
    if (!isStaffAdminUser && !isStaffUser) {
      return unauthorized({
        result: "Caller is not a staff admin user or a staff user"
      });
    }

    const data = JSON.parse(event.body);
    const createStudentModel = new CreateStudentModel(data);
    const newUserEmail = createStudentModel.studentEmail;

    const userExists = await userService.doesUserExist(userPoolId, newUserEmail);

    if (userExists) {
      return failure({
        message: "User Already Exists with email",
        email: newUserEmail
      });
    }

    const userCreationResults = await userService.createUser(userPoolId, newUserEmail);
    const userName = userCreationResults.Username;
    await userService.addUserToGroup(StudentUserGroupName, userPoolId, userName);

    const studentProfileId = userName;
    data.studentProfileId = studentProfileId;
    const studentModel = new StudentModel(data);

    const result = await studentProfileService.updateStudentProfile(studentProfileId, studentModel);
    return success({ result: JSON.stringify(result) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function getStudent(event, context) {
  try {
    const studentProfileId = event.pathParameters.studentId;
    const { userPoolId, isStaffAdminUser, isStaffUser, userSub } = await getUserDetails(event);
    if (!isStaffAdminUser && !isStaffUser && userSub !== studentProfileId) {
      return unauthorized({
        result: "Caller is not a staff admin user or a staff user and this is not a call for own profile"
      });
    }

    const user = await userService.getUser(userPoolId, studentProfileId);
    if (user == undefined) {
      return failure({
        message: "Could not find student user with id",
        studentId: studentProfileId
      });
    }

    const result = await studentProfileService.studentProfile(studentProfileId);
    return success({ result: result });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function updateStudent(event, context) {
  try {
    const studentProfileId = event.pathParameters.studentId;
    const { userPoolId, isStaffAdminUser, isStaffUser, userSub } = await getUserDetails(event);
    if (!isStaffAdminUser && !isStaffUser && userSub !== studentProfileId) {
      return unauthorized({
        result: "Caller is not a staff admin user or a staff user and this is not a call for own profile"
      });
    }

    const user = await userService.getUser(userPoolId, studentProfileId);
    if (user == undefined) {
      return failure({
        message: "Could not find student user with id",
        studentId: studentProfileId
      });
    }

    //TODO: Check if we are actually deleting a student user

    const data = JSON.parse(event.body);
    const updateStudentModel = new UpdateStudentModel(data);
    updateStudentModel.studentProfileId = studentProfileId;

    const result = await studentProfileService.updateStudentProfile(studentProfileId, updateStudentModel);
    return success({ result: JSON.stringify(result) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function deleteStudent(event, context) {
  try {
    const studentProfileId = event.pathParameters.studentId;
    const { userPoolId, isStaffAdminUser, isStaffUser } = await getUserDetails(event);
    if (!isStaffAdminUser && !isStaffUser) {
      return unauthorized({
        result: "User is not a staff admin user or a staff user"
      });
    }

    const user = await userService.getUser(userPoolId, studentProfileId);
    if (user == undefined) {
      return failure({
        message: "Could not find student user with id",
        studentId: studentProfileId
      });
    }

    //TODO: Check if we are actually deleting a student user

    await userService.deleteUser(userPoolId, studentProfileId);
    const result = await studentProfileService.deleteStudentProfile(studentProfileId);
    return success({ result: JSON.stringify(result) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function createStudentISA(event, context) {
  try {
    const studentId = event.pathParameters.studentId;
    const { userPoolId, isStaffAdminUser, isStaffUser } = await getUserDetails(event);
    if (!isStaffAdminUser && !isStaffUser) {
      return unauthorized({
        result: "Caller is not a staff admin user or a staff user"
      });
    }

    const user = await userService.getUser(userPoolId, studentId);
    if (user == undefined) {
      return failure({
        message: "Could not find student user with id",
        studentId: studentId
      });
    }

    const data = JSON.parse(event.body);
    const createStudentISAModel = new CreateStudentISAModel(data);
    const isaExists = await studentISAService.doesISAExist(studentId);
    if (isaExists) {
      return failure({
        message: "ISA already exists for student",
        studentId: studentId
      });
    }

    createStudentISAModel.studentId = studentId;
    const result = await studentISAService.updateStudentISA(studentId, createStudentISAModel);
    return success({ result: JSON.stringify(result) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function getStudentISA(event, context) {
  try {
    const studentId = event.pathParameters.studentId;
    const { userPoolId, isStaffAdminUser, isStaffUser, userSub } = await getUserDetails(event);
    if (!isStaffAdminUser && !isStaffUser && userSub !== studentId) {
      return unauthorized({
        result: "Caller is not a staff admin user or a staff user and this is not a call for own isa"
      });
    }

    const user = await userService.getUser(userPoolId, studentId);
    if (user == undefined) {
      return failure({
        message: "Could not find student user with id",
        studentId: studentId
      });
    }

    const isaExists = await studentISAService.doesISAExist(studentId);
    if (!isaExists) {
      return failure({
        message: "ISA does not exist for student",
        studentId: studentId
      });
    }

    const result = await studentISAService.studentISA(studentId);
    return success({ result: result });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function updateISA(event, context) {
  try {
    const studentId = event.pathParameters.studentId;
    const { userPoolId, isStaffAdminUser, isStaffUser, userSub } = await getUserDetails(event);
    if (!isStaffAdminUser && !isStaffUser && userSub !== studentId) {
      return unauthorized({
        result: "Caller is not a staff admin user or a staff user and this is not a call for own isa"
      });
    }

    const user = await userService.getUser(userPoolId, studentId);
    if (user == undefined) {
      return failure({
        message: "Could not find student user with id",
        studentId: studentId
      });
    }

    //TODO: Check if we are actually updating a student user isa

    const data = JSON.parse(event.body);
    const updateStudentISAModel = new UpdateStudentISAModel(data);
    updateStudentISAModel.studentId = studentId;

    const result = await studentISAService.updateStudentISA(studentId, updateStudentISAModel);
    return success({ result: JSON.stringify(result) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}

export async function deleteStudentISA(event, context) {
  try {
    const studentId = event.pathParameters.studentId;
    const { userPoolId, isStaffAdminUser, isStaffUser } = await getUserDetails(event);
    if (!isStaffAdminUser && !isStaffUser) {
      return unauthorized({
        result: "User is not a staff admin user or a staff user"
      });
    }

    const user = await userService.getUser(userPoolId, studentId);
    if (user == undefined) {
      return failure({
        message: "Could not find student user with id",
        studentId: studentId
      });
    }

    //TODO: Check if we are actually deleting a student user isa

    const result = await studentISAService.deleteStudentISA(studentId);
    return success({ result: JSON.stringify(result) });
  } catch (err) {
    console.error("Lamdda Error", err);
    return failure(err);
  }
}
