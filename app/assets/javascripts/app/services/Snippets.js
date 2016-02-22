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
                    headers: function () {
                        return { API_KEY: RaspiEndpoint.secret };
                    },
                    createResource: function () {
                        return $resource(this.url(), {}, { save: { method: 'POST', headers: this.headers() } });
                    }
                };
            }]);
    })(services = raspi.services || (raspi.services = {}));
})(raspi || (raspi = {}));
