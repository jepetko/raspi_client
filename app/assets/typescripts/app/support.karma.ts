/// <reference path="references.karma.ts"/>

module raspi.karma {
    export function module(name:string) {
        try {
            angular.mock.module(name);
        } catch(e) {
            if(!e.message.match(/injector already created/i)) {
                throw e;
            }
        }
        return true;
    }
}