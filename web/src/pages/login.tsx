// import { Meta } from "@/components/shared/meta";
import { Button } from "@/components/custom/button";
import { InputField } from "@/components/custom/input-field";
import { Logo } from "@/components/custom/logo";
import { useLoginMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/to-error-map";
import { useIsAuth } from "@/utils/use-is-auth";
import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
    useIsAuth();
    const [loginMut] = useLoginMutation();
    const [loading, setLoading] = useState(false);
    const client = useApolloClient();
    const router = useRouter();
    return (
        <div>
            {/* <Head>
                <Meta title={"Login - Lumos"} />
                <title>Login – Lumos</title>
            </Head> */}
            <div className="h-screen">
                <div className="px-6 py-5 z-10">
                    <Link href="/">
                        <Logo className="text-primary-blue h-6 w-auto" />
                    </Link>
                </div>
                <div
                    style={{
                        marginTop: "13.8vh",
                    }}
                    className="px-6 md:px-0 md:w-80 ml-auto mr-auto flex flex-col items-center justify-center"
                >
                    <p className="text-4xl text-brown-900 mb-3 gara">
                        Login to your account
                    </p>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={async (values, { setErrors }) => {
                            const response = await loginMut({
                                variables: values,
                            });
                            if (response.data?.login.errors) {
                                setErrors(
                                    toErrorMap(response.data.login.errors)
                                );
                            } else if (response.data?.login.user) {
                                if (typeof router.query.next === "string") {
                                    router.push(router.query.next);
                                } else {
                                    // worked
                                    setLoading(true);
                                    await client.resetStore();
                                    router.push("/app");
                                }
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="w-full">
                                <InputField
                                    name="email"
                                    placeholder="saban@sec.net"
                                    label="Email"
                                    fullWidth
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="alabama jones"
                                    label="Password"
                                    fullWidth
                                />
                                <Button
                                    loading={isSubmitting || loading}
                                    colored
                                    type="submit"
                                    label="Continue"
                                    className="mt-5"
                                />
                            </Form>
                        )}
                    </Formik>
                    <p className="text-gray-500 text-sm font-medium mt-6">
                        Don{"'"}t have an account?{" "}
                        <Link
                            href="/signup"
                            className="hover:text-primary-color transition-all"
                        >
                            Sign up
                        </Link>
                    </p>
                    {/* TODO – build pages for forgot password */}
                    {/* <p className="text-gray-600 text-smol mt-2">
                        <a
                            href="/forgot-password"
                            className="hover:underline hover:text-primary-color transition-all"
                        >
                            Forgot password?
                        </a>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default Login;
