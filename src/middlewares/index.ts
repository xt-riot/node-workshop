import express, { Express } from "express"
import databaseMiddleware from "./database.middleware"

export function registerMiddlewares(app: Express) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // inject database into the request to be used in the controllers
    app.use((req, res, next) => {
        req.db = databaseMiddleware
        next()
    })

    // TODO: Log timing of requests
    app.use((req, res, next) => {
        console.log('Request:', req.method, req.path)
        next()
    })
}

declare global {
    namespace Express {
        interface Request {
            db: typeof databaseMiddleware
        }
    }
}