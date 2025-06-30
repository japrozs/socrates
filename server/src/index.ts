import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express, { RequestHandler } from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { User } from "./entities/user";
import { UserResolver } from "./resolvers/user-resolver";
import { Course } from "./entities/course";
import { CourseResolver } from "./resolvers/course-resolver";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User, Course],
    });
    await conn.runMigrations();

    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        })
    );

    app.use(
        // @ts-ignore
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 10, // 1000 * 60 * 60 * 24 * 10, // 10 days
                httpOnly: true,
                sameSite: "lax",
                secure: __prod__,
                domain: __prod__ ? process.env.COOKIE_DOMAIN : undefined,
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false,
        }) as RequestHandler
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, CourseResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
    });

    apolloServer.applyMiddleware({
        // TODO: fix this, idk why tsc is buggin
        // @ts-ignore
        app,
        cors: false,
    });

    // @ts-ignore
    app.get("/is-auth", async (req, res) => {
        const uid = req.session.userId;

        if (!uid) {
            return res.status(200).json({
                authenticated: false,
            });
        }

        const user = await User.findOne(uid);
        if (!user) {
            return res.status(200).json({
                authenticated: false,
            });
        }

        return res.status(200).json({ authenticated: true });
    });

    app.listen(parseInt(process.env.PORT), () => {
        console.log(`🚀 Server started on localhost:${process.env.PORT}`);
    });
};

main().catch((err: Error) => {
    console.error(err.message);
});
