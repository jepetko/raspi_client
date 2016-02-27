/// <reference path="../../references.karma.ts"/>

module raspi.karma {

    var endpointForm:ng.IAugmentedJQuery, scope:raspi.directives.endpointform.IEndpointFormScope,
        formCtrl: ng.IFormController, raspiEndpoint: raspi.values.IRaspiEndpoint;

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
        formCtrl = <ng.IFormController>scope.endpointForm;

        raspiEndpoint = $injector.get("RaspiEndpoint");
    }));

    describe("form rendering", function() {
        it("renders the scope values", function() {
            scope.endpoint = {
                protocol: 'http',
                host: 'localhost',
                port: 9292,
                secret: 'secret'
            };
            scope.$digest();

            expect(endpointForm.find('[name="protocol"]').val()).toEqual("http");
            expect(endpointForm.find('[name="host"]').val()).toEqual("localhost");
            expect(endpointForm.find('[name="port"]').val()).toEqual("9292");
            expect(endpointForm.find('[name="secret"]').val()).toEqual("secret");
        });
    });

    describe("endpoint form validation", function () {

        it("validates the presence of the protocol", function() {
            scope.endpoint = {
                protocol: '',
                host: 'localhost',
                port: 9292,
                secret: 'secret'
            };
            scope.$digest();

            expect(formCtrl.$valid).toBe(false);
            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["protocol"];
            expect(modelCtrl.$error["required"]).toBeDefined();
        });

        it("validates the presence of the host", function() {
            scope.endpoint = {
                protocol: 'https',
                host: '',
                port: 9292,
                secret: 'secret'
            };
            scope.$digest();

            expect(formCtrl.$valid).toBe(false);
            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["host"];
            expect(modelCtrl.$error["required"]).toBeDefined();
        });

        it("validates the presence of the port", function() {
            scope.endpoint = {
                protocol: 'https',
                host: 'localhost',
                port: 0,
                secret: 'secret'
            };
            scope.$digest();

            expect(formCtrl.$valid).toBe(false);
            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["port"];
            expect(modelCtrl.$error["between"]).toBeDefined();
        });

        it("validates the presence of the secret", function() {
            scope.endpoint = {
                protocol: 'https',
                host: 'localhost',
                port: 1,
                secret: ''
            };
            scope.$digest();

            expect(formCtrl.$valid).toBe(false);
            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["secret"];
            expect(modelCtrl.$error["required"]).toBeDefined();
        });

        it("sets the port invalid if the value is not between 1 and 65535)", function() {
            scope.endpoint = {
                protocol: 'http',
                host: 'localhost',
                port: 65536,
                secret: 'secret'
            }
            scope.$digest();

            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["port"];
            expect(modelCtrl.$error["between"]).toBeDefined();
        });

        it("sets the port invalid if the value is alpha numeric", function() {
            scope.endpoint = {
                protocol: 'https',
                host: 'localhost',
                port: 0,
                secret: 'secret'
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
                port: 123,
                secret: 'secret'
            };
            scope.$digest();

            var modelCtrl:ng.INgModelController = <ng.INgModelController>formCtrl["port"];
            expect(modelCtrl.$error["between"]).toBeUndefined();
            expect(endpointForm.find('[name="port"]').val()).toEqual("123");
        });

        it("does not touch the value of the RaspiEndpoint as long as the form isn't saved", function() {
            endpointForm.find('[name="protocol"]').val("https").trigger("input");
            expect(scope.endpoint.protocol).toEqual("https");
            expect(raspiEndpoint.protocol).toEqual(raspi.values.RASPI_DEFAULT_PROTOCOL);
        });
    });

    describe("save()", function() {

        beforeEach(function() {
            raspiEndpoint.reset();
        });

        it("performs a REST call");

        it("saves the values in the original value", function() {
            scope.endpoint = {
                protocol: 'https',
                host: 'localhost',
                port: 123,
                secret: 'secret'
            };
            scope.$digest();

            scope.save();
            expect(raspiEndpoint.protocol).toEqual('https');
            expect(raspiEndpoint.host).toEqual('localhost');
            expect(raspiEndpoint.port).toEqual(123);
            expect(raspiEndpoint.secret).toEqual('secret');
        });

        it("resets the values to the defaults", function() {
            scope.endpoint = {
                protocol: 'https',
                host: 'localhost',
                port: 123,
                secret: 'secret'
            };

            scope.$digest();

            expect(scope.endpoint.protocol).toEqual('https');
            scope.reset();
            expect(scope.endpoint.protocol).toEqual(raspi.values.RASPI_DEFAULT_PROTOCOL);
        });
    });
}