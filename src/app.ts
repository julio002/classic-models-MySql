import express, { Express, NextFunction, Request, Response } from "express";
import bodyParse from "body-parser";
import "express-async-errors";
import { errors } from "celebrate";

import connection from "./database/sequelize";
import routes from "./api/routes/index";
import AppError from "./utils/AppError";

const app: Express = express();
const port: number = 3000;

app.use(bodyParse.json());

app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World Express and TypeScript!!!");
});

app.use(errors());

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    try {
        res.status(err.getHttpCode()).send(err.getError());
    } catch (error) {
        const appError = new AppError(
            "InternalServerError",
            "Erro interno no servidor",
            500
        );
        res.status(500).send(appError.getError());
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta : ${port}`);
});

connection();
