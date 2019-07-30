import { WebHost } from "./Core/WebHost";
import { Startup } from "./Startup";

const PORT = 3000;

async function main() {
    await WebHost
        .CreateDefaultBuilder()
        .UsePort(PORT)
        .UserStartup(new Startup())
        .Build()
        .Run();
}

main().then(() => {
    // tslint:disable-next-line: no-console
    console.log(`服务器正在监听端口${PORT}!`);
}).catch(() => {
    // tslint:disable-next-line: no-console
    console.error("服务器启动失败!");
});
