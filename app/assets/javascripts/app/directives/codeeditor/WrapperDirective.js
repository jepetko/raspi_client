/// <reference path="../../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var codeeditor;
        (function (codeeditor) {
            var WrapperDirective = (function () {
                function WrapperDirective() {
                    this.restrict = "E";
                    this.scope = true;
                    this.replace = true;
                    this.templateUrl = "app/directives/codeeditor/wrapper.html";
                    this.link = function (scope, element, attrs) {
                        scope.model = { code: "", exitCode: 0, output: "" };
                    };
                }
                return WrapperDirective;
            })();
            raspi.app.directive("codeEditorWrapper", [function () { return new WrapperDirective(); }]);
        })(codeeditor = directives.codeeditor || (directives.codeeditor = {}));
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
