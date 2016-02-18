/// <reference path="../references.ts"/>

module raspi.directives {

    class CodeEditorDirective implements ng.IDirective {
        restrict = 'E';
        template = '<div></div>';
    }

    app.directive('code-editor-directive', [() => { new CodeEditorDirective() }]);
}