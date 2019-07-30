import Cors from "@koa/cors";
import Koa from "koa";
import { Context } from "koa";
import Router from "koa-router";
import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import { DbConnectFunc } from "../Database/Database";
import { IMiddleware } from "../Middlewares/IMiddleware";
import { Route } from "../Routes/Routes";
import { Application } from "./Application";
import { IStartup } from "./IStartup";

export class ApplicationBuilder {
    private app: Koa;
    private port: number;
    private connectDB: DbConnectFunc;

    constructor() {
        this.app = new Koa();
        this.port = 80;
    }

    public Use(handler: (ctx: Context, next?: () => Promise<any>) => void): ApplicationBuilder {
        this.app.use(handler);
        return this;
    }

    public UsePort(port: number): ApplicationBuilder {
        this.port = port;
        return this;
    }

    public UserStartup(startup: IStartup): ApplicationBuilder {
        startup.Configure(this);
        return this;
    }

    // public UseDatabase(): ApplicationBuilder;
    public UseDatabase(options?: ConnectionOptions): ApplicationBuilder {
        if (options) {
            this.connectDB = () => createConnection(options);
        } else {
            this.connectDB = () => createConnection();
        }
        return this;
    }

    public UseRouter(routes: Route[]) {
        const router = new Router();
        routes.forEach((route) => {
            switch (route.method.toUpperCase()) {
                case "GET": router.get(route.path, route.action); break;
                case "POST": router.post(route.path, route.action); break;
                case "DELETE": router.delete(route.path, route.action); break;
                case "PATCH": router.patch(route.path, route.action); break;
                case "PUT": router.put(route.path, route.action); break;
            }
        });
        this.app.use(router.routes());
        this.app.use(router.allowedMethods());
        return this;
    }

    public UseCors() {
        this.app.use(Cors());
    }

    public UseMiddleware(middleware: IMiddleware) {
        this.app.use(middleware.Invoke);
        return this;
    }

    public UseMiddlewareAsync(middleware: IMiddleware) {
        this.app.use(middleware.Invoke);
        return this;
    }

    public Build() {
        return new Application(this.app, this.port, this.connectDB);
    }
}
