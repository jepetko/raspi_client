/// <reference path="../../references.ts"/>

module raspi.directives.common {

    interface IModal extends JQuery {
        modal(options: any);
        modal(action: string);
    }

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

    app.directive("dialog", ["$parse", <ng.IDirectiveFactory>function($parse: ng.IParseService) {

        interface IDialogScope extends ng.IScope {
            title: string;
        }

        return <ng.IDirective>{
            strict: "E",
            templateUrl: "app/directives/common/dialog.html",
            transclude: true,
            replace: true,
            link: function(scope: IDialogScope, element: IModal, attrs: ng.IAttributes) {
                scope.title = $parse(attrs["title"])(scope);

                scope.$on("endpointForm.saved", function() {
                    element.modal("hide");
                });

                element.on("hide.bs.modal", function() {
                    scope.$broadcast("dialog.hide");
                });
            }
        }
    }]);
}