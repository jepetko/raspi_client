/// <reference path="../../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var commandbar;
        (function (commandbar) {
            var IStatus;
            (function (IStatus) {
                IStatus[IStatus["SUCCESS"] = 0] = "SUCCESS";
                IStatus[IStatus["ERROR"] = 1] = "ERROR";
            })(IStatus || (IStatus = {}));
            var CommandbarDirective = (function () {
                function CommandbarDirective(Snippets) {
                    var _this = this;
                    this.Snippets = Snippets;
                    this.restrict = "E";
                    this.scope = {
                        code: "@"
                    };
                    this.templateUrl = "app/directives/commandbar/commandbar.html";
                    this.link = function (scope, element, attrs) {
                        scope.save = function () {
                            _this.Snippets.createResource().save({ code: scope.code }, function () {
                                scope.status = IStatus.SUCCESS;
                            }, function () {
                                scope.status = IStatus.ERROR;
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
