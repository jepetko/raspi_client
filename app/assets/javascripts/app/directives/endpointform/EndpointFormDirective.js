/// <reference path="../../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var endpointform;
        (function (endpointform) {
            var EndpointFormDirective = (function () {
                function EndpointFormDirective() {
                    this.restrict = "E";
                    this.replace = true;
                    this.scope = true;
                    this.templateUrl = "app/directives/endpointform/endpointform.html";
                    this.require = "form";
                    this.link = function (scope, element, attrs, formCtrl) {
                    };
                }
                return EndpointFormDirective;
            })();
            raspi.app.directive("endpointForm", [function () { return new EndpointFormDirective(); }]);
        })(endpointform = directives.endpointform || (directives.endpointform = {}));
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
