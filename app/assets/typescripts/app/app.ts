module raspi {
    export const app: ng.IModule = angular.module('app', ['templates', 'ngResource', 'ui.ace'])
    .config(["$httpProvider", function($httpProvider: ng.IHttpProvider) {
        $httpProvider.interceptors.push("HttpInterceptorService");
    }]);
}