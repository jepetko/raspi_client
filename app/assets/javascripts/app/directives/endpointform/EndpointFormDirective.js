/// <reference path="../../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var endpointform;
        (function (endpointform) {
            var EndpointFormDirective = (function () {
                function EndpointFormDirective(raspiEndpoint) {
                    var _this = this;
                    this.raspiEndpoint = raspiEndpoint;
                    this.restrict = "E";
                    this.replace = true;
                    this.scope = true;
                    this.templateUrl = "app/directives/endpointform/endpointform.html";
                    this.require = "form";
                    this.link = function (scope, element, attrs, formCtrl) {
                        scope.endpoint = angular.copy(_this.raspiEndpoint, {});
                        scope.save = function () {
                            if (formCtrl.$invalid) {
                                return;
                            }
                            angular.merge(_this.raspiEndpoint, scope.endpoint);
                        };
                        scope.reset = function () {
                            console.info("orig", _this.raspiEndpoint);
                            scope.endpoint = angular.copy(_this.raspiEndpoint, {});
                        };
                    };
                }
                return EndpointFormDirective;
            })();
            raspi.app.directive("endpointForm", ["RaspiEndpoint", function (RaspiEndpoint) { return new EndpointFormDirective(RaspiEndpoint); }]);
        })(endpointform = directives.endpointform || (directives.endpointform = {}));
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
