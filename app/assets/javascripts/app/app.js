var raspi;
(function (raspi) {
    raspi.app = angular.module('app', ['templates', 'ngResource', 'ui.ace'])
        .config(["$httpProvider", function ($httpProvider) {
            $httpProvider.interceptors.push("HttpInterceptorService");
        }]);
})(raspi || (raspi = {}));
