/// <reference path="../../references.ts"/>

module raspi.directives.commandbar   {

    import ISnippetsResource = raspi.services.ISnippetsResource;
    import IResourceFactoryMethod = raspi.services.IResourceFactoryMethod;

    enum IStatus {
        SUCCESS,
        ERROR
    }

    export interface ICommandbarScope extends ng.IScope {
        code: string;
        status: IStatus;
        save();
    }

    class CommandbarDirective implements ng.IDirective {

        restrict = "E";
        scope = {
            code: "@"
        };
        templateUrl = "app/directives/commandbar/commandbar.html";

        constructor(private Snippets: IResourceFactoryMethod<ISnippetsResource>) {
        }

        link: ng.IDirectiveLinkFn = (scope: ICommandbarScope, element: JQuery, attrs: ng.IAttributes) => {
            scope.save = () => {
                this.Snippets.createResource().save({code: scope.code}, () => {
                    scope.status = IStatus.SUCCESS;
                }, () => {
                    scope.status = IStatus.ERROR;
                });
            }
        }
    }

    app.directive("commandBar", ["Snippets", (SnippetsFactoryMethod: IResourceFactoryMethod<ISnippetsResource>) => { return new CommandbarDirective(SnippetsFactoryMethod);}]);
}