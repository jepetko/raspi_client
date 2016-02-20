/// <reference path="../references.ts"/>
var raspi;
(function (raspi) {
    var values;
    (function (values) {
        raspi.app.value("RaspiEndpoint", {
            protocol: "http",
            host: "localhost",
            port: 9292
        });
    })(values = raspi.values || (raspi.values = {}));
})(raspi || (raspi = {}));
