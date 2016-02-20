/// <reference path="../../references.ts"/>

module raspi.directives {

    import ISnippetsResource = raspi.services.ISnippetsResource;

    export interface ICommandbarScope extends ng.IScope {
        code: string;
        save();
    }

    class CommandbarDirective implements ng.IDirective {

        restrict: string = "E";
        scope: boolean = true;
        templateUrl: string = "app/directives/commandbar/commandbar.html";

        constructor(private Snippets: ISnippetsResource) {
        }

        link: ng.IDirectiveLinkFn = (scope: ICommandbarScope, element: JQuery, attrs: ng.IAttributes) => {
            scope.save = () => {
                this.Snippets.save({code: scope.code});
            }
        }
    }

    app.directive("commandBar", ["Snippets", (Snippets: ISnippetsResource) => { return new CommandbarDirective(Snippets);}]);
}