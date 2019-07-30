import { Context } from "koa";
import { getManager } from "typeorm";
import uuid from "uuid/v4";
import { Image } from "../Entities/Image";
import { Label } from "../Entities/Label";
import { ImageMeta } from "../Models/ImageMeta";
import { ImageService } from "../Services/ImageService";

export async function GetImagesAction(context: Context) {
    const repository = getManager().getRepository(Image);
    const images = await repository.find();
    context.body = images;
}

export async function CreateImageAction(context: Context) {
    const imageRepository = getManager().getRepository(Image);
    const labelRepository = getManager().getRepository(Label);

    const imageMetadata = context.request.body as ImageMeta;
    // 分配id
    let id = uuid();
    while (await imageRepository.findOne(id)) {
        id = uuid();
    }
    // 保存图片到本地
    const image = await (new ImageService()).download(imageMetadata.uri, id);

    // 关联labels
    const labels = await labelRepository.findByIds(imageMetadata.labels);
    image.labels = labels;
    await imageRepository.save(image);
    context.body = { id: image.id };
}
