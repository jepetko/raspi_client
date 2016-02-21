/// <reference path="../../references.ts"/>

module raspi.directives.common {

    app.directive("between", <ng.IDirectiveFactory>function() {
        return <ng.IDirective>{
            strict: "A",
            require: 'ngModel',
            link: function(scope: ng.IScope, element: JQuery, attrs: ng.IAttributes, ngModelCtrl: ng.INgModelController) {
                var validationRegexp: RegExp = new RegExp("^[1-9](?:[\\d]{1,4})?");
                scope.$watch(function() {
                    return element.val();
                }, function(newValue: string) {
                    if (newValue === "") {
                        return;
                    }
                    var result: RegExpMatchArray = newValue.match(validationRegexp);
                    var valid: boolean = (result != null && result.length > 0);
                    if (valid) {
                        valid = parseInt(newValue) < 65536;
                    }
                    ngModelCtrl.$setValidity('between', valid);
                });
            }
        }
    });
}