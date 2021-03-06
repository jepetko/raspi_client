/// <reference path="../../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var codeeditor;
        (function (codeeditor) {
            var CodeEditorDirective = (function () {
                function CodeEditorDirective() {
                    this.restrict = "E";
                    this.replace = true;
                    this.scope = {
                        code: "="
                    };
                    this.templateUrl = "app/directives/codeeditor/codeeditor.html";
                    this.link = function (scope, element, attrs) {
                    };
                }
                return CodeEditorDirective;
            })();
            raspi.app.directive("codeEditor", [function () { return new CodeEditorDirective(); }]);
        })(codeeditor = directives.codeeditor || (directives.codeeditor = {}));
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
