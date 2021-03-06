/// <reference path="../references.ts"/>

module raspi.services {

    interface ISnippet extends ng.resource.IResource<ISnippet> {
        code: string;
    }

    export interface ISnippetsResource extends ng.resource.IResourceClass<ISnippet> {
    }

    app.factory("Snippets", ["$resource", "RaspiEndpoint", function($resource: ng.resource.IResourceService, RaspiEndpoint: raspi.values.IRaspiEndpoint): IResourceFactoryMethod<ISnippetsResource> {
        return <IResourceFactoryMethod<ISnippetsResource>>{
            url(): string {
                return `${RaspiEndpoint.protocol}:\/\/${RaspiEndpoint.host}\:${RaspiEndpoint.port}\/snippets/:id`;
            },
            headers() {
                return {API_KEY: RaspiEndpoint.secret};
            },
            createResource(): ISnippetsResource {
                return <ISnippetsResource> $resource(this.url(), {}, {save: {method: 'POST', headers: this.headers()}});
            }
        };
    }]);

}