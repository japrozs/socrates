import { Navbar } from "@/components/custom/navbar";
import React from "react";

export default function Home() {
    return (
        <div>
            <Navbar />
            <p className="mt-10 text-center text-brown-900 text-7xl font-light gara">
                Create <span className="text-red-500">beautiful</span> courses
                <br />
                <span className="text-primary-blue">quickly</span> and{" "}
                <span className="bg-primary-blue/15 px-2 rounded-lg text-primary-blue">
                    easily
                </span>
            </p>
        </div>
    );
}
