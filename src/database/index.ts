import { createConnection, getConnectionOptions } from "typeorm";


getConnectionOptions().then((defaultOptions) => {
    const ormconfig = require('../../ormconfig')
    createConnection(Object.assign(defaultOptions, ormconfig));
});
