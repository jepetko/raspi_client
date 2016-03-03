/// <reference path="../../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var progressbar;
        (function (progressbar) {
            var ProgressBarDirective = (function () {
                function ProgressBarDirective() {
                    this.restrict = "E";
                    this.replace = true;
                    this.scope = true;
                    this.templateUrl = "app/directives/progressbar/progressbar.html";
                    this.link = function (scope, element, attrs) {
                        scope.visible = false;
                        scope.$on("http.state", function (event, state) {
                            scope.visible = state.pending > 0;
                        });
                    };
                }
                return ProgressBarDirective;
            })();
            raspi.app.directive("progressBar", [function () {
                    return new ProgressBarDirective();
                }]);
        })(progressbar = directives.progressbar || (directives.progressbar = {}));
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
