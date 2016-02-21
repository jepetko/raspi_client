/// <reference path="../../references.ts"/>

module raspi.directives.endpointform {

    import IRaspiEndpoint = raspi.values.IRaspiEndpoint;
    export interface IEndpointFormScope extends ng.IScope {
        endpoint: IRaspiEndpoint;
        save();
    }

    class EndpointFormDirective implements ng.IDirective {
        restrict: string = "E";
        replace: boolean = true;
        scope: boolean = true;
        templateUrl: string = "app/directives/endpointform/endpointform.html";
        require: string = "form";

        link: ng.IDirectiveLinkFn = (scope: IEndpointFormScope, element: JQuery, attrs: ng.IAttributes, formCtrl: ng.IFormController) => {

        }
    }

    app.directive("endpointForm", [() => {return new EndpointFormDirective();}]);

}