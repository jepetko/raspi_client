/// <reference path="../../references.karma.ts"/>

module raspi.karma {

    var endpointForm:ng.IAugmentedJQuery, scope:raspi.directives.endpointform.IEndpointFormScope,
        formCtrl: ng.IFormController;

    beforeEach(function () {
        raspi.karma.module("app");
    });

    beforeEach(inject(function ($injector) {
        var $rootScope:ng.IScope = $injector.get("$rootScope");
        var $compile:ng.ICompileService = $injector.get("$compile");
        endpointForm = $compile("<endpoint-form></endpoint-form>")($rootScope.$new());
        scope = <raspi.directives.endpointform.IEndpointFormScope>endpointForm.scope();
        scope.$digest();
        //here the name of the form is referenced
        formCtrl = <ng.IFormController>endpointForm.scope()["endpointform"];
    }));

    describe("endpoint form validation", function () {

        it("validates the presence of the protocol", function() {
            scope.endpoint = {
                protocol: '',
                host: 'localhost',
                port: 9292
            };
            scope.$digest();

            expect(endpointForm.find('[name="host"]').val()).toEqual("localhost");
            expect(endpointForm.find('[name="port"]').val()).toEqual("9292");
            expect(formCtrl.$valid).toBe(false);
            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["protocol"];
            expect(modelCtrl.$error["required"]).toBeDefined();
        });

        it("validates the presence of the host", function() {
            scope.endpoint = {
                protocol: 'https',
                host: '',
                port: 9292
            };
            scope.$digest();
            expect(endpointForm.find('[name="protocol"]').val()).toEqual("https");
            expect(endpointForm.find('[name="port"]').val()).toEqual("9292");
            expect(formCtrl.$valid).toBe(false);
            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["host"];
            expect(modelCtrl.$error["required"]).toBeDefined();
        });

        it("validates the presence of the port", function() {
            scope.endpoint = {
                protocol: 'https',
                host: 'localhost',
                port: 0
            };
            scope.$digest();
            expect(endpointForm.find('[name="protocol"]').val()).toEqual("https");
            expect(endpointForm.find('[name="host"]').val()).toEqual("localhost");
            expect(formCtrl.$valid).toBe(false);
            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["port"];
            expect(modelCtrl.$error["between"]).toBeDefined();
        });

        it("set the port invalid if the value is not between 1 and 65535)", function() {
            scope.endpoint = {
                protocol: 'http',
                host: 'localhost',
                port: 65536
            }
            scope.$digest();

            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["port"];
            expect(modelCtrl.$error["between"]).toBeDefined();
        });

        it("set the port invalid if the value is alpha numeric", function() {
            scope.endpoint = {
                protocol: 'https',
                host: 'localhost',
                port: 0
            };
            //note: at the runtime the port could become alphanumeric
            angular.merge(scope.endpoint, {port: 'a123'});
            scope.$digest();

            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["port"];
            expect(modelCtrl.$error["between"]).toBeDefined();
        });

        it("allows numeric values for the port", function() {
            scope.endpoint = {
                protocol: 'https',
                host: 'localhost',
                port: 123
            };
            scope.$digest();

            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["port"];
            expect(modelCtrl.$error["between"]).toBeUndefined();
            expect(endpointForm.find('[name="port"]').val()).toEqual("123");
        });
    });

    describe("save()", function() {
        it("performs a REST call");
    });
}