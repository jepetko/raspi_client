/// <reference path="../references.ts"/>
var raspi;
(function (raspi) {
    var directives;
    (function (directives) {
        var NamesController = (function () {
            function NamesController($scope) {
                this.$scope = $scope;
            }
            NamesController.prototype.addName = function (name) {
                if (!this.$scope.names) {
                    this.$scope.names = [];
                }
                this.$scope.names.push(name);
            };
            NamesController.$inject = ['$scope'];
            return NamesController;
        })();
        var NamesDirective = (function () {
            function NamesDirective() {
                this.scope = {};
                this.controller = NamesController;
                this.controllerAs = 'ctrl';
                this.bindToController = true;
                this.link = function (scope, elem, attributes) {
                    scope.names = [];
                };
                this.templateUrl = 'names-directive.html';
            }
            return NamesDirective;
        })();
        raspi.app.directive('names', [function () { return new NamesDirective(); }]);
    })(directives = raspi.directives || (raspi.directives = {}));
})(raspi || (raspi = {}));
