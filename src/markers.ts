import {MarkerMetadata} from "types";

export function createPopup(popupTemplate: string, metadata: MarkerMetadata): string {
    let popup = popupTemplate
        .replaceAll("{{title}}", metadata.title)
        .replaceAll("{{country}}", metadata.country)
        .replaceAll("{{period}}", metadata.period);

    return popup;
}