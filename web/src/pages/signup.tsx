// import { Meta } from "@/components/shared/meta";
import { Button } from "@/components/custom/button";
import { InputField } from "@/components/custom/input-field";
import { Logo } from "@/components/custom/logo";
import { useRegisterMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/to-error-map";
import { useIsAuth } from "@/utils/use-is-auth";
import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface SignupProps {}

const Signup: React.FC<SignupProps> = ({}) => {
    useIsAuth();
    const [registerMut] = useRegisterMutation();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const client = useApolloClient();
    return (
        <div>
            {/* <Head>
                <Meta title={"Signup - Lumos"} />
                <title>Signup – Lumos</title>
            </Head> */}
            <div className="h-screen">
                <div className="px-6 py-5 z-10">
                    <Link href="/">
                        <Logo className="text-primary-blue h-6 w-auto" />
                    </Link>
                </div>
                <div
                    style={{
                        marginTop: "8.8vh",
                    }}
                    className="px-6 md:px-0 md:w-80 ml-auto mr-auto  flex flex-col items-center justify-center"
                >
                    <p className="text-4xl text-brown-900 mb-3 gara">
                        Create an account
                    </p>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                        }}
                        onSubmit={async (values, { setErrors }) => {
                            const res = await registerMut({
                                variables: {
                                    options: values,
                                },
                            });
                            if (res.data?.register.errors) {
                                setErrors(toErrorMap(res.data.register.errors));
                            } else if (res.data?.register.user) {
                                setLoading(true);
                                router.push("/app");
                                await client.resetStore();
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="w-full">
                                <InputField
                                    name="name"
                                    placeholder="Dwight Schrute"
                                    label="Name"
                                    fullWidth
                                />
                                <InputField
                                    name="email"
                                    placeholder="dwight@dundermifflin.com"
                                    label="Email"
                                    fullWidth
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="bears, beets, battlestar galactica!"
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
                    <p className="text-gray-400 text-sm font-medium mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="hover:text-primary-blue transition-all"
                        >
                            Log in
                        </Link>
                    </p>
                    {/* TODO – add functionality to forget your password, if that makes sense */}
                    {/* <p className="text-gray-600 text-smol mt-2">
                        <a
                            href="/forgot-password"
                            className="underline hover:text-primary-color transition-all"
                        >
                            Forgot password?
                        </a>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default Signup;
