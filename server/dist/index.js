"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
require("dotenv-safe/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const user_1 = require("./entities/user");
const user_resolver_1 = require("./resolvers/user-resolver");
const course_1 = require("./entities/course");
const course_resolver_1 = require("./resolvers/course-resolver");
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [user_1.User, course_1.Course],
    });
    await conn.runMigrations();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
            domain: constants_1.__prod__ ? process.env.COOKIE_DOMAIN : undefined,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_resolver_1.UserResolver, course_resolver_1.CourseResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.get("/is-auth", async (req, res) => {
        const uid = req.session.userId;
        if (!uid) {
            return res.status(200).json({
                authenticated: false,
            });
        }
        const user = await user_1.User.findOne(uid);
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
main().catch((err) => {
    console.error(err.message);
});
//# sourceMappingURL=index.js.map