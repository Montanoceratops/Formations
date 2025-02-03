import {map, MapOptions, markerClusterGroup, MarkerOptions, Popup, tileLayer} from 'leaflet';
import 'leaflet.markercluster';
import * as works from "./works/*/marker.ts";

const options: MapOptions = {}
const formationsMap = map('map', options).setView([0, 0], 2);

// maybe consider https://openfreemap.org/?
tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(formationsMap);

// add all markers
let markerGroup = markerClusterGroup()

let markerOptions: MarkerOptions = {
    autoPan: true,
    autoPanPadding: [16, 16]
}

for (let work of Object.values(works)) {
    markerGroup.addLayer(
        // magic
        work["default"](markerOptions)
    )
}

formationsMap.addLayer(markerGroup)

// misplaced popup workaround
document.querySelector(".leaflet-popup-pane").addEventListener("load", function (event) {
    // @ts-ignore
    let tagName: string = event.target.tagName;
    // @ts-ignore
    let popup: Popup = formationsMap._popup; // Currently open popup, if any.

    if (tagName === "IMG" || tagName === "PICTURE" && popup && !popup["_updated"]) {
        popup["_updated"] = true; // prevent infinite loop
        popup.update();
    }
}, true); // Capture the load event, because it does not bubble.
