import {map, MapOptions, tileLayer} from 'leaflet';
import 'leaflet.markercluster';
import * as works from "./works/*/marker.ts";

const options: MapOptions = {

}
const formationsMap = map('map', options).setView([0, 0], 2);

tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {

    attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

}).addTo(formationsMap);

// add all markers

for (let work of Object.values(works)) {
    work["default"](formationsMap)
}
