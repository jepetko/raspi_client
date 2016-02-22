/// <reference path="../references.ts"/>

module raspi.values {

    export const RASPI_DEFAULT_PROTOCOL: string = "http";
    export const RASPI_DEFAULT_HOST: string = "localhost";
    export const RASPI_DEFAULT_PORT: number = 9292;
    export const RASPI_DEFAULT_SECRET: string = "123";

    export interface IRaspiEndpoint {
        protocol: string;
        host: string;
        port: number;
        secret: string;
        reset?();
    }

    app.value("RaspiEndpoint", <IRaspiEndpoint>{
        protocol: RASPI_DEFAULT_PROTOCOL,
        host: RASPI_DEFAULT_HOST,
        port: RASPI_DEFAULT_PORT,
        secret: RASPI_DEFAULT_SECRET,
        reset: function() {
            this.protocol = RASPI_DEFAULT_PROTOCOL;
            this.host = RASPI_DEFAULT_HOST
            this.port = RASPI_DEFAULT_PORT;
            this.secret = RASPI_DEFAULT_SECRET;
        }
    });
}