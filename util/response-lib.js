export function success(body) {
    return buildResponse(200, body);
}

export function failure(err) {
    const body = {
        "error": JSON.stringify(err)
    };
    return buildResponse(500, body);
}

export function unauthorized(body) {
  return buildResponse(401, body);
}

export function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Credentials": true
          },
        body: JSON.stringify(body)
    };
};