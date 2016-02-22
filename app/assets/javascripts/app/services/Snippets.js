/// <reference path="../references.ts"/>
var raspi;
(function (raspi) {
    var services;
    (function (services) {
        raspi.app.factory("Snippets", ["$resource", "RaspiEndpoint", function ($resource, RaspiEndpoint) {
                return {
                    url: function () {
                        return RaspiEndpoint.protocol + "://" + RaspiEndpoint.host + ":" + RaspiEndpoint.port + "/snippets/:id";
                    },
                    options: function () {
                        return { header: { secret: RaspiEndpoint.secret } };
                    },
                    createResource: function () {
                        return $resource(this.url(), {}, this.options());
                    }
                };
            }]);
    })(services = raspi.services || (raspi.services = {}));
})(raspi || (raspi = {}));
