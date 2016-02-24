/// <reference path="../../references.ts"/>

module raspi.directives.endpointform {

    import IRaspiEndpoint = raspi.values.IRaspiEndpoint;

    export interface IEndpointFormScope extends ng.IScope {
        orig: IRaspiEndpoint;
        endpoint: IRaspiEndpoint;
        endpointForm: ng.IFormController;
        save();
        reset();
    }

    class EndpointFormDirective implements ng.IDirective {
        restrict: string = "E";
        replace: boolean = true;
        scope: boolean = true;
        templateUrl: string = "app/directives/endpointform/endpointform.html";
        require: string = "form";

        constructor(private raspiEndpoint: IRaspiEndpoint) {
        }

        link: ng.IDirectiveLinkFn = (scope: IEndpointFormScope, element: JQuery, attrs: ng.IAttributes, formCtrl: ng.IFormController) => {
            scope.endpoint = <IRaspiEndpoint>angular.copy(this.raspiEndpoint, {});
            scope.orig = this.raspiEndpoint;
            scope.endpointForm = formCtrl;
            scope.save = () => {
                if(formCtrl.$invalid) {
                    return;
                }
                angular.merge(this.raspiEndpoint, scope.endpoint);
            }
            scope.reset = () => {
                this.raspiEndpoint.reset();
                scope.endpoint = <IRaspiEndpoint>angular.copy(this.raspiEndpoint, {});
            }
        }
    }

    app.directive("endpointForm", ["RaspiEndpoint", (RaspiEndpoint: IRaspiEndpoint) => {return new EndpointFormDirective(RaspiEndpoint);}]);

}