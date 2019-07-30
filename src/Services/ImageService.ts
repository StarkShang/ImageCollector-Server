import * as fs from "fs";
import * as path from "path";
// import request = require("request-promise-native");
import request = require("request");
import sharp = require("sharp");
import { Image } from "../Entities/Image";

export class ImageService {
    private storageRootPath = path.join("Images");

    constructor() {
        if (!fs.existsSync(this.storageRootPath)) {
            fs.mkdirSync(this.storageRootPath);
        }
    }

    public async download(url: string, name: string): Promise<Image> {
        try {
            const image = request(url).pipe(sharp());
            // const image = sharp(request(url) as Stream);
            const metadata = await image.metadata();
            image.toFile(path.join(this.storageRootPath, name + "." + metadata.format));
            return {
                hasAlpha: metadata.hasAlpha,
                height: metadata.height,
                id: name,
                labels: [],
                size: metadata.size,
                space: metadata.space,
                width: metadata.width,
            };
        } catch (error) {
            // tslint:disable-next-line: no-console
            console.log(error);
        }
    }
}
