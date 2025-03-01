import {MarkerMetadata} from "./types";
import {divIcon, DivIcon, LatLngTuple, Marker, marker, MarkerOptions, PopupOptions, TooltipOptions} from "leaflet";
import avifMarker from "src/assets/marker.png?width=64&height=64&as=avif";
import webpMarker from "src/assets/marker.png?width=64&height=64&as=webp";
import pngMarker from "src/assets/marker.png?width=64&height=64&as=png";
import avifMarker2x from "src/assets/marker.png?width=128&height=128&as=avif";
import webpMarker2x from "src/assets/marker.png?width=128&height=128&as=webp";
import pngMarker2x from "src/assets/marker.png?width=128&height=128&as=png";
import avifMarker4x from "src/assets/marker.png?width=256&height=256&as=avif";
import webpMarker4x from "src/assets/marker.png?width=256&height=256&as=webp";
import pngMarker4x from "src/assets/marker.png?width=256&height=256&as=png";

export function createPopup(popupTemplate: string, metadata: MarkerMetadata): string {
    return popupTemplate
        .replaceAll("{{title}}", metadata.title)
        .replaceAll("{{country}}", metadata.country)
        .replaceAll("{{period}}", metadata.period)
        .replaceAll("{{alt}}", metadata.alt);
}

const markerOptions: MarkerOptions = {};

const popupOptions: PopupOptions = {
    autoPan: true,
    autoPanPadding: [16, 16],
};

const tooltipOptions: TooltipOptions = {};

export function createMarker(popup: string, metadata: MarkerMetadata): Marker[] {
    let coordinates = metadata.coordinates;
    let offsetLeftCoordinates: LatLngTuple = [coordinates[0], coordinates[1] + 360];
    let offsetRightCoordinates: LatLngTuple = [coordinates[0], coordinates[1] - 360];
    return [
        coordinates,
        offsetLeftCoordinates,
        offsetRightCoordinates,
    ].map((coordinates) => {
        return marker(coordinates, {...markerOptions, icon: createMarkerIcon()})
            .bindPopup(createPopup(popup, metadata), popupOptions)
            .bindTooltip(metadata.tooltip, tooltipOptions);
    });
}

// if you adjust this, make sure to adjust the imports at the top of the file
// otherwise, the marker will look bad due to low resolution
const iconSize = 64;

function createMarkerIcon(): DivIcon {
    let picture = document.createElement("picture");
    let avifSource = document.createElement("source");
    let webpSource = document.createElement("source");
    let pngFallback = document.createElement("img");

    avifSource.srcset = `${avifMarker}, ${avifMarker2x} 2x, ${avifMarker4x} 4x`;
    avifSource.type = "image/avif";

    webpSource.srcset = `${webpMarker}, ${webpMarker2x} 2x, ${webpMarker4x} 4x`;
    webpSource.type = "image/webp";

    pngFallback.srcset = `${pngMarker}, ${pngMarker2x} 2x, ${pngMarker4x} 4x`;
    pngFallback.src = pngMarker;
    pngFallback.width = iconSize;
    pngFallback.height = iconSize;

    picture.append(avifSource, webpSource, pngFallback);

    return divIcon({
        attribution: "test",
        iconSize: [iconSize, iconSize],
        iconAnchor: [760 / 1519 * iconSize, 1354 / 1519 * iconSize],
        popupAnchor: [0, -iconSize / 8 * 7],
        tooltipAnchor: [iconSize / 16 * 5, -iconSize / 2],
        html: picture,
        className: undefined,
    });
}
