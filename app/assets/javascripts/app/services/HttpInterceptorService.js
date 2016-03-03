/// <reference path="../references.ts"/>
var raspi;
(function (raspi) {
    var services;
    (function (services) {
        var HttpInterceptorService = (function () {
            function HttpInterceptorService($q, $rootScope) {
                var _this = this;
                this.$q = $q;
                this.$rootScope = $rootScope;
                this.state = {
                    done: 0,
                    pending: 0
                };
                this.request = function (config) {
                    if (!_this.isTemplate(config)) {
                        _this.$rootScope.$broadcast("http.request");
                        _this.state.pending++;
                        _this.$rootScope.$broadcast("http.state", _this.state);
                    }
                    return config;
                };
                this.response = function (response) {
                    if (!_this.isTemplate(response.config)) {
                        _this.$rootScope.$broadcast("http.response");
                        _this.state.pending--;
                        _this.state.done++;
                        _this.$rootScope.$broadcast("http.state", _this.state);
                    }
                    return response;
                };
            }
            HttpInterceptorService.prototype.isTemplate = function (config) {
                var match = config.url.match(new RegExp("html$"));
                return match && match.length > 0;
            };
            return HttpInterceptorService;
        })();
        services.HttpInterceptorService = HttpInterceptorService;
        raspi.app.factory("HttpInterceptorService", ["$q", "$rootScope", function ($q, $rootScope) {
                return new HttpInterceptorService($q, $rootScope);
            }]);
    })(services = raspi.services || (raspi.services = {}));
})(raspi || (raspi = {}));
