import { Context } from "koa";
import { getManager } from "typeorm";
import { Label } from "../Entities/Label";

export async function GetLabelsAction(context: Context) {
    const repository = getManager().getRepository(Label);
    const labels = await repository.find();
    context.body = labels;
}

export async function CreateLabelAction(context: Context) {
    try {
        const repository = getManager().getRepository(Label);
        const label = context.request.body;
        await repository.save(label);
        context.body = label;
    } catch (error) {
        context.status = 500 + error.errno;
        context.body = error.message;
    }
}
