/// <reference path="../references.ts"/>

module raspi.services {

    import IRaspiEndpoint = raspi.values.IRaspiEndpoint;
    import IResourceService = angular.resource.IResourceService;
    import IDirectiveFactory = angular.IDirectiveFactory;
    import IResourceServiceFactoryFunction = angular.resource.IResourceServiceFactoryFunction;
    interface ISnippet extends ng.resource.IResource<ISnippet> {
        code: string;
    }

    export interface ISnippetsResource extends ng.resource.IResourceClass<ISnippet> {
        save(): ISnippet;
        save(data:Object): ISnippet;
    }

    export interface IConfigurableSnippetsResource {
        createResource(): ISnippetsResource;
    }

    app.factory("Snippets", ["$resource", "RaspiEndpoint", function($resource: ng.resource.IResourceService, RaspiEndpoint: raspi.values.IRaspiEndpoint): IConfigurableSnippetsResource {
        return <IConfigurableSnippetsResource>{
            createResource(): ISnippetsResource {
                var restUrl: string = `${RaspiEndpoint.protocol}:\/\/${RaspiEndpoint.host}\:${RaspiEndpoint.port}\/snippets/:id`;
                var options = {header: {secret: RaspiEndpoint.secret}};
                return <ISnippetsResource> $resource(restUrl, {}, options);
            }
        };
    }]);

}