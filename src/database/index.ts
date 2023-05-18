import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    const ormconfig = require('../../ormconfig')

    return createConnection(Object.assign(defaultOptions, ormconfig));
};
