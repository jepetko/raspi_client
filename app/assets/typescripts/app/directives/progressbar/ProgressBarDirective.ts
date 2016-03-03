/// <reference path="../../references.ts"/>

module raspi.directives.progressbar {

    export interface IProgressBarScope extends ng.IScope {
        visible: boolean;
    }

    class ProgressBarDirective implements ng.IDirective {
        restrict: string = "E";
        replace: boolean = true;
        scope: boolean = true;
        templateUrl: string = "app/directives/progressbar/progressbar.html";

        link: ng.IDirectiveLinkFn = (scope: IProgressBarScope, element: JQuery, attrs: ng.IAttributes) => {
            scope.visible = false;
            scope.$on("http.state", function(event: ng.IAngularEvent, state: raspi.services.IHttpInterceptorState) {
                scope.visible = state.pending > 0;
            });
        }

    }

    app.directive("progressBar", [ function() {
        return new ProgressBarDirective();
    } ]);

}