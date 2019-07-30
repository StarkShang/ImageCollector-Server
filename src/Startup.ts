import { HelloAction } from "./Controllers/HelloController";
import { CreateImageAction } from "./Controllers/ImageController";
import { CreateLabelAction, GetLabelsAction } from "./Controllers/LabelController";
import { ApplicationBuilder } from "./Core/ApplicationBuilder";
import { IStartup } from "./Core/IStartup";
import { Image } from "./Entities/Image";
import { Label } from "./Entities/Label";

export class Startup implements IStartup {
    public Configure(app: ApplicationBuilder): void {
        app.UseDatabase({
            database: "./Database/images.db",
            entities: [
                Image,
                Label
            ],
            logging: false,
            synchronize: true,
            type: "sqlite",
        });
        app.UseCors();
        app.UseRouter([{
            action: HelloAction,
            method: "get",
            path: "/hello"
        }, {
            action: GetLabelsAction,
            method: "get",
            path: "/labels"
        }, {
            action: CreateLabelAction,
            method: "post",
            path: "/labels"
        }, {
            action: CreateImageAction,
            method: "post",
            path: "/images"
        }]);
    }
}
