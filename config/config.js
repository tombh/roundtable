/*
* =========================
* Main RoundTable Config
* =========================
*/

//The host to bind the HTTP server to
exports.httpHost = "localhost";

//The port to bind the HTTP server to (Optional)
exports.httpPort = process.env.PORT || process.argv.splice(2)[0] || 1337;
