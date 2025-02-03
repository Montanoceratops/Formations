import {map, MapOptions, tileLayer} from 'leaflet';
import 'leaflet.markercluster';
import * as works from "./works/*/marker.ts";

const options: MapOptions = {

}
const formationsMap = map('map', options).setView([0, 0], 2);

tileLayer('https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=WlQcOtyrZYpWipgzrKk0', {

    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',

}).addTo(formationsMap);

// add all markers

for (let work of Object.values(works)) {
    work["default"](formationsMap)
}
