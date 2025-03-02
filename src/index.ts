import {map, MapOptions, markerClusterGroup, Popup, tileLayer} from "leaflet";
import "leaflet.markercluster";
import * as works from "./works/*/marker.ts";

const options: MapOptions = {
    attributionControl: true,
    zoomControl: true,
    zoomSnap: 0.25,
    zoomDelta: 0.5,
    minZoom: 2,
    wheelPxPerZoomLevel: 120,
    worldCopyJump: true,
    fadeAnimation: true,
    markerZoomAnimation: true,
    zoomAnimation: true,
    zoomAnimationThreshold: 6,
};

const formationsMap = map("map", options).setView([0, 0], 2);

// maybe consider https://openfreemap.org/?
tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "<a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
    // noWrap: true,
}).addTo(formationsMap);

// add all markers
let markerGroup = markerClusterGroup({
    animate: true,
    animateAddingMarkers: true,
    spiderfyDistanceMultiplier: 4,
    spiderLegPolylineOptions: {
        weight: 4,
        color: "#3388ff",
        opacity: 1,
        fillOpacity: 0.4,
        smoothFactor: 0,
        lineCap: "round",
        lineJoin: "round",
        noClip: true,
    },
    polygonOptions: {
        weight: 4,
        color: "#3388ff",
        opacity: 1,
        fillOpacity: 0.4,
        smoothFactor: 0,
        lineCap: "round",
        lineJoin: "round",
        noClip: true,
    },
});

Object.values(works)
    .flatMap(work => work["marker"]()) // magic
    .forEach((marker) => {
        markerGroup.addLayer(marker);
    });

formationsMap.addLayer(markerGroup);

// misplaced popup workaround
document.querySelector(".leaflet-popup-pane").addEventListener("load", (event) => {
    let tagName = (event.target as HTMLElement).tagName;
    // @ts-ignore
    let popup: Popup = formationsMap._popup; // Currently open popup, if any.

    if ((tagName === "IMG" || tagName === "PICTURE" || tagName === "SOURCE") && popup && !popup["_updated"]) {
        popup["_updated"] = true; // prevent infinite loop
        popup.update();
        setTimeout(() => { // allow it to be re-updated if opened again
            popup["_updated"] = undefined;
        }, 1000);
    }
}, true); // Capture the load event, because it does not bubble.
