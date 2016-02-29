/// <reference path="../../references.ts"/>

module raspi.directives.codeeditor {

    interface IWrapperModel {
        code: string;
        exitCode?: number;
        output?: string;
    }

    export interface IWrapperScope extends ng.IScope {
        model: IWrapperModel;
    }

    class WrapperDirective implements ng.IDirective {

        restrict = "E";
        scope = true;
        replace = true;
        templateUrl = "app/directives/codeeditor/wrapper.html";

        link: ng.IDirectiveLinkFn = (scope: IWrapperScope, element: JQuery, attrs: ng.IAttributes) => {
            scope.model = {code: "", exitCode: 0, output: ""};
        }
    }

    app.directive("codeEditorWrapper", [() => { return new WrapperDirective(); }]);
}