/// <reference path="../../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var CommandbarDirective = (function () {
            function CommandbarDirective(Snippets) {
                var _this = this;
                this.Snippets = Snippets;
                this.restrict = "E";
                this.scope = true;
                this.templateUrl = "app/directives/commandbar/commandbar.html";
                this.link = function (scope, element, attrs) {
                    scope.save = function () {
                        _this.Snippets.save({ code: 'puts "hello"' });
                    };
                };
            }
            return CommandbarDirective;
        })();
        raspi.app.directive("commandBar", ["Snippets", function (Snippets) { return new CommandbarDirective(Snippets); }]);
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
