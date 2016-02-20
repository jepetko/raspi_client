/// <reference path="../../references.karma.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var codeeditor;
        (function (codeeditor) {
            var CodeEditorDirective = (function () {
                function CodeEditorDirective() {
                    this.restrict = "E";
                    this.templateUrl = "app/directives/codeeditor/codeeditor.html";
                    this.link = function (scope, element, attrs) {
                    };
                }
                return CodeEditorDirective;
            })();
        })(codeeditor = directives.codeeditor || (directives.codeeditor = {}));
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
