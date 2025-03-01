declare module "*/metadata.json" {
    let value: import("../types").MarkerMetadata;
    export = value;
}

declare module "*/marker.json" {
    let value: [import("../types.ts").JsonMarkerMetadata];
    export = value;
}