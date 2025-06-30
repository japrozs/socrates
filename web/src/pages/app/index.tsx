import { AppSidebar } from "@/components/custom/app-sidebar";
import { Spinner } from "@/components/custom/spinner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useMeQuery } from "@/generated/graphql";
import { useIsAuth } from "@/utils/use-is-auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface AppIndexProps {}

const AppIndex: React.FC<AppIndexProps> = ({}) => {
    useIsAuth();
    const { data, loading } = useMeQuery();
    const router = useRouter();

    useEffect(() => {
        if (data && data.me && data.me.courses.length > 0) {
            router.push(`/c/${data.me.courses[0].id}`);
        }
    }, [data, loading]);

    return (
        <SidebarProvider>
            <AppSidebar />
            {false ? (
                // {!loading && data && data.me ? (
                <main className="p-2">
                    <p>hi there</p>
                </main>
            ) : (
                <main className="flex items-center justify-center w-full h-screen">
                    <Spinner className="size-6 text-transparent fill-gray-300" />
                </main>
            )}
        </SidebarProvider>
    );
};

export default AppIndex;
