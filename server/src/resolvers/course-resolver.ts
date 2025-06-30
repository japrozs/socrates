import { Course } from "../entities/course";
import { isAuth } from "../middleware/is-auth";
import { Context } from "../types";
import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";

@Resolver(Course)
export class CourseResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Course)
    async createCourse(@Arg("name") name: string, @Ctx() { req }: Context) {
        if (name.trim().length == 0) {
            return false;
        }
        return Course.create({
            name,
            creatorId: req.session.userId,
        }).save();
    }

    @UseMiddleware(isAuth)
    @Query(() => Course)
    async getCourse(
        @Arg("id", () => String) id: string,
        @Ctx() { req }: Context
    ) {
        return Course.findOne({ where: { id, creatorId: req.session.userId } });
    }
}
