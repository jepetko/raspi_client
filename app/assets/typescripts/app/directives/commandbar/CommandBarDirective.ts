/// <reference path="../../references.ts"/>

module raspi.directives.commandbar   {

    import ISnippetsResource = raspi.services.ISnippetsResource;
    import IResourceFactoryMethod = raspi.services.IResourceFactoryMethod;

    export enum IStatus {
        SUCCESS,
        ERROR
    }

    export interface ICommandbarScope extends ng.IScope {
        code: string;
        status: IStatus;
        exitCode: number;
        output: string;
        save();
    }

    class CommandbarDirective implements ng.IDirective {

        restrict = "E";
        replace = true;
        scope = {
            code: "@",
            output: "=",
            exitCode: "=",
            status: "="
        };
        templateUrl = "app/directives/commandbar/commandbar.html";

        constructor(private Snippets: IResourceFactoryMethod<ISnippetsResource>) {
        }

        link: ng.IDirectiveLinkFn = (scope: ICommandbarScope, element: JQuery, attrs: ng.IAttributes) => {
            scope.save = () => {
                this.Snippets.createResource().save({code: scope.code}, (response: any) => {
                    scope.status = IStatus.SUCCESS;
                    scope.output = response.output;
                    scope.exitCode = response.exit_code;
                }, () => {
                    scope.status = IStatus.ERROR;
                    scope.output = "";
                    scope.exitCode = -1;
                });
            }
        }
    }

    app.directive("commandBar", ["Snippets", (SnippetsFactoryMethod: IResourceFactoryMethod<ISnippetsResource>) => { return new CommandbarDirective(SnippetsFactoryMethod);}]);
}