var fs = require('fs');

module.exports = {
    error: function (error) {
        var errors = {
          200: "ok",
          201: "created",

          400: "bad_request",
          401: "unauthorized",
          403: "forbidden",
          404: "file_not_found",
          406: "no_SSL",

          500: "internal_server_error",

          900: "method_disabled"
        };

        return {
            code: error,
            message: errors[error]
        };
    },
    setupLumberJack: function(f) {
        var LumberJack = require('lumberjack');

        this.lumberjack = new LumberJack(false, undefined, {prefix: 'RoundTable', timestamp: false, colors: true, ignoreLevelSentry: ['debug']});
    },
    getLumberJack : function() {
        return this.lumberjack;
    },
    getConfig: function() {
        return require('../config/config.js');
    },
    getVersion: function() {
        return require('../package.json').version;
    },
    validateEmail: function (email) {
        // Validate the email format using Regex
        var re = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
        return re.test(email);
    },
    enableMiddleware: function(app) {
        //Enable the cookie parser, JSON parser and URL encode parser
        app.use(require('cors'))
        app.use(require('express').static(__dirname + "/public"))
    },
    handleWebsockets: function(app) {
        require('../inc/websockets.js').handleWebsockets(app);
    },
    ascii: function () {
        console.log("" +
        "                  _____                       _ _______    _     _                \n"+
        "                 |  __ \\                     | |__   __|  | |   | |              \n"+
        "                 | |__) |___  _   _ _ __   __| |  | | __ _| |__ | | ___           \n"+
        "                 |  _  // _ \\| | | | '_ \\ / _` |  | |/ _` | '_ \\| |/ _ \\      \n"+
        "                 | | \\ \\ (_) | |_| | | | | (_| |  | | (_| | |_) | |  __/        \n"+
        "                 |_|  \\_\\___/ \\__,_|_| |_|\\__,_|  |_|\\__,_|_.__/|_|\\___|    \n"+
        "\n"+
        "                  Roundtable v" + require('../package.json').version + " is launching...\n");
    }
};