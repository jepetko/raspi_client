/// <reference path="../references.ts"/>

module raspi.services {

    export class HttpInterceptorService implements ng.IHttpInterceptor {

        private done: number = 0;
        private running: number = 0;

        constructor(private $q: ng.IQService, private $rootScope: ng.IRootScopeService) {
        }

        private isTemplate(config: ng.IRequestConfig): boolean {
            var match: RegExpMatchArray = config.url.match(new RegExp("html$"));
            return match && match.length > 0;
        }

        request = (config: ng.IRequestConfig): ng.IRequestConfig => {
            if (!this.isTemplate(config)) {
                this.$rootScope.$broadcast("http.request");
                this.$rootScope.$broadcast("http.state", {running: ++this.running, done: this.done});
            }
            return config;
        }

        response = (response: ng.IHttpPromiseCallbackArg<any>) => {
            if (!this.isTemplate(response.config)) {
                this.$rootScope.$broadcast("http.response");
                this.$rootScope.$broadcast("http.state", {running: --this.running, done: ++this.done});
            }
            return response;
        }

    }

    app.factory("HttpInterceptorService", ["$q", "$rootScope", function($q: ng.IQService, $rootScope: ng.IRootScopeService) {
        return new HttpInterceptorService($q, $rootScope);
    } ]);
}