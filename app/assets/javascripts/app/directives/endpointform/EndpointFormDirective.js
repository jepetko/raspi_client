/// <reference path="../../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var endpointform;
        (function (endpointform) {
            var EndpointFormDirective = (function () {
                function EndpointFormDirective(origRaspiEndpoint) {
                    var _this = this;
                    this.origRaspiEndpoint = origRaspiEndpoint;
                    this.restrict = "E";
                    this.replace = true;
                    this.scope = true;
                    this.templateUrl = "app/directives/endpointform/endpointform.html";
                    this.require = "form";
                    this.link = function (scope, element, attrs, formCtrl) {
                        scope.endpoint = angular.copy(_this.origRaspiEndpoint, {});
                        scope.endpointForm = formCtrl;
                        scope.save = function () {
                            if (formCtrl.$invalid) {
                                return;
                            }
                            angular.merge(_this.origRaspiEndpoint, scope.endpoint);
                            scope.$emit('endpointForm.saved');
                        };
                        var resetModelCtrl = function (name, value) {
                            var modelCtrl = formCtrl[name];
                            modelCtrl.$setViewValue(value);
                            modelCtrl.$render();
                        };
                        scope.reset = function () {
                            scope.endpoint = angular.copy(_this.origRaspiEndpoint, {});
                            resetModelCtrl("protocol", scope.endpoint.protocol);
                            resetModelCtrl("host", scope.endpoint.host);
                            resetModelCtrl("port", scope.endpoint.port);
                            resetModelCtrl("secret", scope.endpoint.secret);
                        };
                        scope.resetToDefault = function () {
                            _this.origRaspiEndpoint.reset();
                            scope.reset();
                        };
                        scope.$on("dialog.hide", function () {
                            scope.reset();
                        });
                    };
                }
                return EndpointFormDirective;
            })();
            raspi.app.directive("endpointForm", ["RaspiEndpoint", function (RaspiEndpoint) { return new EndpointFormDirective(RaspiEndpoint); }]);
        })(endpointform = directives.endpointform || (directives.endpointform = {}));
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
