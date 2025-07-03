import { AppSidebar } from "@/components/custom/app-sidebar";
import { Spinner } from "@/components/custom/spinner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useGetCourseQuery, useMeQuery } from "@/generated/graphql";
import { useIsAuth } from "@/utils/use-is-auth";
import { useRouter } from "next/router";
import React from "react";
interface CoursePageProps {}

const CoursePage: React.FC<CoursePageProps> = ({}) => {
    useIsAuth();
    const router = useRouter();
    const id = typeof router.query.id == "string" ? router.query.id : "-1";
    const { data, loading } = useGetCourseQuery({
        variables: {
            id,
        },
    });
    return (
        <SidebarProvider>
            <AppSidebar />
            {data && !loading ? (
                <main className="p-24">
                    {/* <img
                        className="h-56 w-full object-cover border-b border-gray-200"
                        src="https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg"
                    /> */}
                    {/* <div className="px-24 py-10"> */}
                    <p className="text-6xl gara font-normal">
                        {data.getCourse.name}
                    </p>
                </main>
            ) : (
                <main className="flex items-center justify-center w-full h-screen">
                    <Spinner className="size-6 text-transparent fill-gray-300" />
                </main>
            )}
        </SidebarProvider>
    );
};

export default CoursePage;
