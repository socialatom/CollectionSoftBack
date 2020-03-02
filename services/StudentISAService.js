import * as dynamoDBLib from "../util/dynamodb-lib";

function StudentISAService(opts) {
  Object.assign(this, opts);
}

StudentISAService.prototype = {
  studentISA,
  updateStudentISA,
  deleteStudentISA,
  doesISAExist
};

async function studentISA(studentId) {
  const StudentISATableName = process.env.studentISATableName;
  const call = "get";
  const params = {
    TableName: StudentISATableName,
    Key: {
      studentId: studentId
    }
  };
  const result = await dynamoDBLib.call(call, params);
  return result.Item;
}

async function doesISAExist(studentId) {
  const StudentISATableName = process.env.studentISATableName;
  const call = "get";
  const params = {
    TableName: StudentISATableName,
    Key: {
      studentId: studentId
    }
  };
  const result = await dynamoDBLib.call(call, params);
  if (result.Item !== undefined) {
    return true;
  } else {
    return false;
  }
}

async function deleteStudentISA(studentId) {
  const StudentISATableName = process.env.studentISATableName;
  const call = "delete";
  const params = {
    TableName: StudentISATableName,
    Key: {
      studentId: studentId
    }
  };
  const result = await dynamoDBLib.call(call, params);
  return result.Item;
}

async function updateStudentISA(studentId, studentISAObject) {
  const StudentISATableName = process.env.studentISATableName;
  let existingItem = await studentISA(studentId);
  const call = "put";
  let params = {
    TableName: StudentISATableName,
    Key: {
      studentId: studentId
    }
  };
  if (existingItem === undefined) {
    params.Item = studentISAObject;
    params.Item.studentId = studentId;
  } else {
    for (var property in studentISAObject) {
      if (!studentISAObject[property] || property === "studentId") {
        continue;
      }
      existingItem[property] = studentISAObject[property];
    }
    params.Item = existingItem;
    params.Item.studentId = studentId;
  }
  await dynamoDBLib.call(call, params);
  return params.Item;
}

export default StudentISAService;
