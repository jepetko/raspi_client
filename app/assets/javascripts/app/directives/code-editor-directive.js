/// <reference path="../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var CodeEditorDirective = (function () {
            function CodeEditorDirective() {
                this.restrict = 'E';
                this.template = '<div></div>';
            }
            return CodeEditorDirective;
        })();
        raspi.app.directive('code-editor-directive', [function () { new CodeEditorDirective(); }]);
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
