import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import { router } from "./routes";
import "./database";
import "./shared/container";
import { AppError } from "./errors/AppError";
import cors from 'cors';
import * as cron from 'cron';
import createConnection from 'database/index';

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../src/swagger.json";
import { crons } from "./utils/crons";

createConnection();
const app = express();

var corsOptions = {
    origin: ['http://localhost:8080', 'https://www.sistemapoupou.com.br', 'https://main--stirring-gaufre-13fa02.netlify.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

const scheduledTransactionJob = new cron.CronJob('0 1 1,5,10,15,20,25 * *', crons);
scheduledTransactionJob.start();

app.use(cors(corsOptions))

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        });
    }
);


var port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

