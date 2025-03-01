//@ts-ignore
declare module "./works*" {
    import {Marker} from "leaflet";
    type entry = {
        marker: () => Marker[]
    };
    const value: { [key: string]: entry };
    export = value;
}