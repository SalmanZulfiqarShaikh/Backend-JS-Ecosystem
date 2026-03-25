function logReqRes(req,res,next) {
    console.log("Request URL:", req.url);
    console.log("Request Method:", req.method);
    console.log("Request Headers:", req.headers);
    console.log("Request Body:", req.body);
    console.log("Request Query:", req.query);
    console.log("Request Params:", req.params);
    console.log("Request Time:", new Date().toISOString());
    next();
}

module.exports = logReqRes;