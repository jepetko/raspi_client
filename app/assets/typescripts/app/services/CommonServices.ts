/// <reference path="../references.ts"/>

module raspi.services {

    export interface IResourceFactoryMethod<T> {
        createResource(): T;
    }

}