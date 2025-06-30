// import { Meta } from "@/components/custom/meta";
import { Logo } from "@/components/custom/logo";
import React from "react";

interface FourOhFour {}

const FourOhFour: React.FC<FourOhFour> = ({}) => {
    return (
        <div className="h-screen">
            {/* <Meta title="Page not found – Noble Travels" /> */}
            <div className="h-screen">
                <div className="px-6 py-5 z-10">
                    <a href="/">
                        <Logo className={`h-7 w-auto text-primary-blue`} />
                    </a>
                </div>
                <div
                    style={{
                        marginTop: "13.8vh",
                    }}
                    className="p-6"
                >
                    <p className="text-lg text-beige-500 font-medium menlo mb-5">
                        404 Error
                    </p>
                    <p className="text-5xl gara">Page not found</p>
                    <p className="mt-2 text-md font-medium text-beige-800">
                        The page you are looking for does not exist. Or does it?{" "}
                        <span className="font-semibold text-beige-900">
                            It does not.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FourOhFour;
