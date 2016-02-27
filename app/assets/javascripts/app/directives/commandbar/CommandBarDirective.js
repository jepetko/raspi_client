/// <reference path="../../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var commandbar;
        (function (commandbar) {
            (function (IStatus) {
                IStatus[IStatus["SUCCESS"] = 0] = "SUCCESS";
                IStatus[IStatus["ERROR"] = 1] = "ERROR";
            })(commandbar.IStatus || (commandbar.IStatus = {}));
            var IStatus = commandbar.IStatus;
            var CommandbarDirective = (function () {
                function CommandbarDirective(Snippets) {
                    var _this = this;
                    this.Snippets = Snippets;
                    this.restrict = "E";
                    this.replace = true;
                    this.scope = {
                        code: "@",
                        output: "=",
                        exitCode: "=",
                        status: "="
                    };
                    this.templateUrl = "app/directives/commandbar/commandbar.html";
                    this.link = function (scope, element, attrs) {
                        scope.save = function () {
                            _this.Snippets.createResource().save({ code: scope.code }, function (response) {
                                scope.status = IStatus.SUCCESS;
                                scope.output = response.output;
                                scope.exitCode = response.exit_code;
                            }, function () {
                                scope.status = IStatus.ERROR;
                                scope.output = "";
                                scope.exitCode = -1;
                            });
                        };
                    };
                }
                return CommandbarDirective;
            })();
            raspi.app.directive("commandBar", ["Snippets", function (SnippetsFactoryMethod) { return new CommandbarDirective(SnippetsFactoryMethod); }]);
        })(commandbar = directives.commandbar || (directives.commandbar = {}));
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
