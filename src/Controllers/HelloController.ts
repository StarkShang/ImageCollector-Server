import { Context } from "koa";

export async function HelloAction(context: Context) {
    context.body = "hello world";
}
