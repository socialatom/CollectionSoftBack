import * as dynamoDBLib from "../util/dynamodb-lib";

function StaffProfileService(opts) {
  Object.assign(this, opts);
}

StaffProfileService.prototype = {
  listStaffProfiles,
  staffProfile,
  updateStaffProfile,
  deleteStaffProfile
};

async function listStaffProfiles() {
  const StaffProfilesTableName = process.env.staffProfilesTableName;
  const call = "scan";
  const params = {
    TableName: StaffProfilesTableName
  };
  const result = await dynamoDBLib.call(call, params);
  return result.Items;
}

async function staffProfile(staffProfileId) {
  const StaffProfilesTableName = process.env.staffProfilesTableName;
  const call = "get";
  const params = {
    TableName: StaffProfilesTableName,
    Key: {
      staffProfileId: staffProfileId
    }
  };
  const result = await dynamoDBLib.call(call, params);
  return result.Item;
}

async function deleteStaffProfile(staffProfileId) {
  const StaffProfilesTableName = process.env.staffProfilesTableName;
  const call = "delete";
  const params = {
    TableName: StaffProfilesTableName,
    Key: {
      staffProfileId: staffProfileId
    }
  };
  const result = await dynamoDBLib.call(call, params);
  return result.Item;
}

async function updateStaffProfile(staffProfileId, staffProfileObject) {
  const StaffProfilesTableName = process.env.staffProfilesTableName;
  let existingItem = await staffProfile(staffProfileId);
  const call = "put";
  let params = {
    TableName: StaffProfilesTableName,
    Key: {
      staffProfileId: staffProfileId
    }
  };
  if (existingItem === undefined) {
    params.Item = staffProfileObject;
    params.Item.staffProfileId = staffProfileId;
  } else {
    for (var property in staffProfileObject) {
      if (!staffProfileObject[property] || property === "staffProfileId") {
        continue;
      }
      existingItem[property] = staffProfileObject[property];
    }
    params.Item = existingItem;
    params.Item.staffProfileId = staffProfileId;
  }
  await dynamoDBLib.call(call, params);
  return params.Item;
}

export default StaffProfileService;
