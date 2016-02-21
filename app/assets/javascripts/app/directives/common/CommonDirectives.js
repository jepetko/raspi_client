/// <reference path="../../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var common;
        (function (common) {
            raspi.app.directive("between", function () {
                return {
                    strict: "A",
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var validationRegexp = new RegExp("^[1-9](?:[\\d]{1,4})?");
                        scope.$watch(function () {
                            return element.val();
                        }, function (newValue) {
                            if (newValue === "") {
                                return;
                            }
                            var result = newValue.match(validationRegexp);
                            var valid = (result != null && result.length > 0);
                            if (valid) {
                                valid = parseInt(newValue) < 65536;
                            }
                            ngModelCtrl.$setValidity('between', valid);
                            if (!valid) {
                                ngModelCtrl.$setViewValue("");
                                ngModelCtrl.$render();
                            }
                        });
                    }
                };
            });
        })(common = directives.common || (directives.common = {}));
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
