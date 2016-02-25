/// <reference path="../../references.ts"/>

module raspi.directives.endpointform {

    import IRaspiEndpoint = raspi.values.IRaspiEndpoint;

    export interface IEndpointFormScope extends ng.IScope {
        endpoint: IRaspiEndpoint;
        endpointForm: ng.IFormController;
        save();
        reset();
        resetToDefault();
    }

    class EndpointFormDirective implements ng.IDirective {
        restrict: string = "E";
        replace: boolean = true;
        scope: boolean = true;
        templateUrl: string = "app/directives/endpointform/endpointform.html";
        require: string = "form";

        constructor(private origRaspiEndpoint: IRaspiEndpoint) {
        }

        link: ng.IDirectiveLinkFn = (scope: IEndpointFormScope, element: JQuery, attrs: ng.IAttributes, formCtrl: ng.IFormController) => {
            scope.endpoint = <IRaspiEndpoint>angular.copy(this.origRaspiEndpoint, {});
            scope.endpointForm = formCtrl;
            scope.save = () => {
                if(formCtrl.$invalid) {
                    return;
                }
                angular.merge(this.origRaspiEndpoint, scope.endpoint);

                scope.$emit('endpointForm.saved');
            }

            var resetModelCtrl: Function = (name, value) => {
                var modelCtrl: ng.INgModelController = <ng.INgModelController>formCtrl[name];
                modelCtrl.$setViewValue(value);
                modelCtrl.$render();
            }

            scope.reset = () => {
                scope.endpoint = <IRaspiEndpoint>angular.copy(this.origRaspiEndpoint, {});

                resetModelCtrl("protocol", scope.endpoint.protocol);
                resetModelCtrl("host", scope.endpoint.host);
                resetModelCtrl("port", scope.endpoint.port);
                resetModelCtrl("secret", scope.endpoint.secret);
            }

            scope.resetToDefault = () => {
                this.origRaspiEndpoint.reset();
                scope.reset();
            }

            scope.$on("dialog.hide", () => {
                scope.reset();
            });
        }

    }

    app.directive("endpointForm", ["RaspiEndpoint", (RaspiEndpoint: IRaspiEndpoint) => {return new EndpointFormDirective(RaspiEndpoint);}]);

}