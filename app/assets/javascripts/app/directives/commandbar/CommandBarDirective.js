/// <reference path="../../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var commandbar;
        (function (commandbar) {
            var CommandbarDirective = (function () {
                function CommandbarDirective(Snippets) {
                    var _this = this;
                    this.Snippets = Snippets;
                    this.restrict = "E";
                    this.scope = true;
                    this.templateUrl = "app/directives/commandbar/commandbar.html";
                    this.link = function (scope, element, attrs) {
                        scope.save = function () {
                            _this.Snippets.createResource().save({ code: scope.code });
                        };
                    };
                }
                return CommandbarDirective;
            })();
            raspi.app.directive("commandBar", ["Snippets", function (SnippetsFactoryMethod) { return new CommandbarDirective(SnippetsFactoryMethod); }]);
        })(commandbar = directives.commandbar || (directives.commandbar = {}));
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
