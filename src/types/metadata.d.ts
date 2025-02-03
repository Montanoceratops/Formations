declare module '*/metadata.json' {
    import {MarkerMetadata} from "types";
    let value: MarkerMetadata;
    export default value;
}
declare module '*/marker.json' {
    import {JsonMarkerMetadata} from "types";
    let value: [JsonMarkerMetadata];
    export default value;
}