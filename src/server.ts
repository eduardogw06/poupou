import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import { router } from "./routes";
import "./database";
import "./shared/container";
import { AppError } from "./errors/AppError";
import cors from 'cors';

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../src/swagger.json";
const app = express();

var corsOptions = {
    origin: ['http://localhost:8080', 'https://www.sistemapoupou.com.br/'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
};

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

