/// <reference path="../references.ts"/>

module raspi.values {

    export interface IRaspiEndpoint {
        protocol: string;
        host: string;
        port: number;
    }

    app.value("RaspiEndpoint", <IRaspiEndpoint>{
        protocol: "http",
        host: "localhost",
        port: 9292
    });
}