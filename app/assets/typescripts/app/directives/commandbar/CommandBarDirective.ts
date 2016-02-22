/// <reference path="../../references.ts"/>

module raspi.directives.commandbar   {

    import ISnippetsResource = raspi.services.ISnippetsResource;
    import IResourceFactoryMethod = raspi.services.IResourceFactoryMethod;

    export interface ICommandbarScope extends ng.IScope {
        code: string;
        save();
    }

    class CommandbarDirective implements ng.IDirective {

        restrict: string = "E";
        scope: boolean = true;
        templateUrl: string = "app/directives/commandbar/commandbar.html";

        constructor(private Snippets: IResourceFactoryMethod<ISnippetsResource>) {
        }

        link: ng.IDirectiveLinkFn = (scope: ICommandbarScope, element: JQuery, attrs: ng.IAttributes) => {
            scope.save = () => {
                this.Snippets.createResource().save({code: scope.code});
            }
        }
    }

    app.directive("commandBar", ["Snippets", (SnippetsFactoryMethod: IResourceFactoryMethod<ISnippetsResource>) => { return new CommandbarDirective(SnippetsFactoryMethod);}]);
}