/// <reference path="../references.ts"/>

module raspi.directives {

    interface INamesScope extends ng.IScope {
        name: string;
        names: string[];
        addName(name: string);
    }

    class NamesController {

        static $inject = ['$scope'];

        constructor(private $scope: INamesScope) {

        }

        addName(name: string) {
            if (!this.$scope.names) {
                this.$scope.names = [];
            }
            this.$scope.names.push(name);
        }
    }

    class NamesDirective implements ng.IDirective {
        scope = {};
        controller = NamesController;
        controllerAs = 'ctrl';
        bindToController = true;

        link = (scope:INamesScope, elem:ng.IAugmentedJQuery, attributes:ng.IAttributes) => {
            scope.names = [];
        }

        templateUrl = 'names-directive.html'
    }

    app.directive('names', [() => new NamesDirective()]);
}