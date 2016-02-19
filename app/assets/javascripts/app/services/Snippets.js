/// <reference path="../references.ts"/>
var raspi;
(function (raspi) {
    var services;
    (function (services) {
        raspi.app.factory("Snippets", ["$resource", function ($resource) {
                return $resource("snippets/:id");
            }]);
    })(services = raspi.services || (raspi.services = {}));
})(raspi || (raspi = {}));
