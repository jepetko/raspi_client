/// <reference path="../references.ts"/>

module raspi.services {

    interface ISnippet extends ng.resource.IResource<ISnippet> {
        code: string;
    }

    export interface ISnippetsResource extends ng.resource.IResourceClass<ISnippet> {
        save(): ISnippet;
    }

    app.factory("Snippets", ["$resource", function($resource: ng.resource.IResourceService): ISnippetsResource {
        return <ISnippetsResource> $resource("snippets/:id");
    }]);

}