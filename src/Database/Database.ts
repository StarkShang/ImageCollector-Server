import { Connection, ConnectionOptions} from "typeorm";

type DbConnectDefaultFunc = () => Promise<Connection>;
type DbConnectStringFunc = (name: string) => Promise<Connection>;
type DbConnectOptionsFunc = (options: ConnectionOptions) => Promise<Connection>;
export type DbConnectFunc = () => Promise<Connection>;
