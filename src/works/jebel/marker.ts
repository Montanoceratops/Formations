import {Map, marker, Marker} from 'leaflet';
import {createPopup} from '/src/markers';
import metadata from './metadata.json';
import popup from 'bundle-text:./popup.html';

// noinspection JSUnusedGlobalSymbols
export default function createMarker(map: Map): Marker {
    return marker(metadata.coordinates, {title: metadata.tooltip})
        .bindPopup(createPopup(popup, metadata))
        .addTo(map)
}