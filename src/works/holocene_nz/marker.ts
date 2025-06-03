import {Marker} from "leaflet";
import {createMarker} from "/src/markers";
import metadata from "./metadata.json";
import popup from "bundle-text:./popup.html";

// noinspection JSUnusedGlobalSymbols
export function marker(): Marker[] {
    return createMarker(popup, metadata);
}