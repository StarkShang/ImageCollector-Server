import Koa from "koa";
import { Connection, createConnection } from "typeorm";
import { DbConnectFunc } from "../Database/Database";
import { Image } from "../Entities/Image";
import { Label } from "../Entities/Label";

export class Application {
    private app: Koa;
    private readonly connectDB: DbConnectFunc;
    private readonly port: number;
    constructor(app: Koa, port: number = 80, connectDB: DbConnectFunc) {
        this.app = app;
        this.port = port;
        this.connectDB = connectDB;
    }

    public async Run(callback?: () => void) {
        try {
            await this.connectDB();
            this.app.listen(this.port, callback);
        } catch (err) {
            // tslint:disable-next-line: no-console
            console.log(`启动服务器错误: ${err}`);
        }
    }
}

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-type");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

// app.post("/", function(req, res) {
//     // 检查id是否重复
//     let times = 0;
//     do {
//         let imageId = uuid();
//         let filePath = path.join(rootPath, imageId + ".png");
//         times = times + 1;
//         if (times >= 3) { res.status(409); } // 重试3次后返回409资源冲突
//     } while (fs.existsSync(filePath));
//     // 保存文件
//     request(req.body.imageUri).pipe(fs.createWriteStream(filePath));
//     // 保存数据
//     for (const label of req.body.labels) {
//         let insertImageLabelSql = "insert into image_labels(imageId, labelId) values(" + imageId + "," + label + ")";
//         sqliteDB.insertData(insertTileSql, tileData);
//     }
//     const width = 800;
//     const height = 600;
//     const size = 123123;
//     const color = "rgb";
//     const hasAlphaChannel = true;
// tslint:disable-next-line: max-line-length
//     const insertImageMetaSql = `insert into images(width, height, size, color, hasAlphaChannel) values(${width},${height},${size},${color},${hasAlphaChannel})`;
//     sqliteDB.insertData(insertTileSql, tileData);
//     res.send('post请求成功');
// });

// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });
