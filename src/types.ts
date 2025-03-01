import {LatLngTuple} from "leaflet";

export class MarkerMetadata {
    coordinates: LatLngTuple;
    tooltip: string;
    title: string;
    country: string;
    period: string;
}

export class JsonMarkerMetadata {
    coordinates: LatLngTuple;
    tooltip: string;
    title: string;
    country: string;
    period: string;
    image: { file: string, size: string };
}