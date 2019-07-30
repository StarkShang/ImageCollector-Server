import bodyParser from "koa-bodyparser";
import { ApplicationBuilder } from "./ApplicationBuilder";

export class WebHost {
    public static CreateDefaultBuilder(): ApplicationBuilder {
        return new ApplicationBuilder()
            .Use(bodyParser());
    }
}
