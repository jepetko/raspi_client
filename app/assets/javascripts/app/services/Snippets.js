/// <reference path="../references.ts"/>
var raspi;
(function (raspi) {
    var services;
    (function (services) {
        raspi.app.factory("Snippets", ["$resource", "RaspiEndpoint", function ($resource, RaspiEndpoint) {
                return $resource(RaspiEndpoint.protocol + "://" + RaspiEndpoint.host + ":" + RaspiEndpoint.port + "/snippets/:id");
            }]);
    })(services = raspi.services || (raspi.services = {}));
})(raspi || (raspi = {}));
