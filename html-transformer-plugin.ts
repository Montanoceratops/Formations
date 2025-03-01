import {Transformer} from "@parcel/plugin";
import type {Data} from "ejs";
import * as ejs from "ejs";

// noinspection JSUnusedGlobalSymbols
export default new Transformer({
    async loadConfig({config}) {
        let {contents: templateMeta} = await config.getConfig([
            "meta.config.json"
        ]);

        return {config: templateMeta as Data};
    },

    async transform({asset, config: {config}}) {
        const code = await asset.getCode();

        const result = await ejs.render(code, {meta: config}, {
            cache: true,
            filename: asset.filePath,
            async: true,
            beautify: false,
        })

        asset.setCode(result);

        return [asset];
    },
});
