/// <reference path="../references.ts"/>
var raspi;
(function (raspi) {
    var values;
    (function (values) {
        values.RASPI_DEFAULT_PROTOCOL = "http";
        values.RASPI_DEFAULT_HOST = "localhost";
        values.RASPI_DEFAULT_PORT = 9292;
        values.RASPI_DEFAULT_SECRET = "123";
        raspi.app.value("RaspiEndpoint", {
            protocol: values.RASPI_DEFAULT_PROTOCOL,
            host: values.RASPI_DEFAULT_HOST,
            port: values.RASPI_DEFAULT_PORT,
            secret: values.RASPI_DEFAULT_SECRET,
            reset: function () {
                this.protocol = values.RASPI_DEFAULT_PROTOCOL;
                this.host = values.RASPI_DEFAULT_HOST;
                this.port = values.RASPI_DEFAULT_PORT;
                this.secret = values.RASPI_DEFAULT_SECRET;
            }
        });
    })(values = raspi.values || (raspi.values = {}));
})(raspi || (raspi = {}));
