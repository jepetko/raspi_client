/// <reference path="../references.ts"/>

module raspi.services {

    interface ISnippet extends ng.resource.IResource<ISnippet> {
        code: string;
    }

    export interface ISnippetsResource extends ng.resource.IResourceClass<ISnippet> {
        save(): ISnippet;
        save(data: Object): ISnippet;
    }

    app.factory("Snippets", ["$resource", "RaspiEndpoint", function($resource: ng.resource.IResourceService, RaspiEndpoint: raspi.values.IRaspiEndpoint): ISnippetsResource {
        var restUrl: string = `${RaspiEndpoint.protocol}:\/\/${RaspiEndpoint.host}\:${RaspiEndpoint.port}\/snippets/:id`;
        var options = {header: {secret: RaspiEndpoint.secret}};
        return <ISnippetsResource> $resource(restUrl, {}, options);
    }]);

}