import {marker, Marker, MarkerOptions} from 'leaflet';
import {createPopup} from '/src/markers';
import metadata from './metadata.json';
import popup from 'bundle-text:./popup.html';

// noinspection JSUnusedGlobalSymbols
export default function createMarker(options: MarkerOptions): Marker {
    return marker(metadata.coordinates, {...options, title: metadata.tooltip})
        .bindPopup(createPopup(popup, metadata))
}