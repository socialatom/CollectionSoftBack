import AWS from "aws-sdk";

export function call(action, params) {
    const dynamoDB = new AWS.DynamoDB.DocumentClient({
      convertEmptyValues: true
    });
    //console.log("Dynamo DB Query action:",action," params:",params);
    return dynamoDB[action](params).promise();
}