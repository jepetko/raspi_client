/// <reference path="../references.ts"/>
var raspi;
(function (raspi) {
    var services;
    (function (services) {
        raspi.app.factory("Snippets", ["$resource", "RaspiEndpoint", function ($resource, RaspiEndpoint) {
                return {
                    createResource: function () {
                        var restUrl = RaspiEndpoint.protocol + "://" + RaspiEndpoint.host + ":" + RaspiEndpoint.port + "/snippets/:id";
                        var options = { header: { secret: RaspiEndpoint.secret } };
                        return $resource(restUrl, {}, options);
                    }
                };
            }]);
    })(services = raspi.services || (raspi.services = {}));
})(raspi || (raspi = {}));
