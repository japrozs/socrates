import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    fullWidth?: boolean;
    shadow?: boolean;
    disableSubmitOnEnter?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    fullWidth,
    shadow,
    disableSubmitOnEnter,
    ...props
}) => {
    const [field, { error }] = useField(props as any);
    return (
        <div className={"mt-3"}>
            <label
                className={"text-sm text-slate-800 font-medium text-opacity-60"}
                htmlFor={field.name}
            >
                {label}
            </label>
            <br />
            <input
                className={`${
                    fullWidth ? "w-full" : "w-80"
                } text-gray-700 font-medium transition-all text-smol border ${
                    shadow && "shadow-sm"
                } placeholder-[#ADBACB] py-1.5 px-3 mt-1.5 mb-1.5 bg-transparent rounded-md outline-none focus:ring-2 focus:ring-blue-200 ${
                    !!error ? "border-red-500" : "border-gray-300"
                }`}
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder}
                onKeyPress={(e) => {
                    if (disableSubmitOnEnter) {
                        if (e.which === 13) {
                            e.preventDefault();
                        }
                    }
                }}
            />
            {error && (
                <span className={"mt-1 font-medium text-sm text-red-500"}>
                    {error}
                </span>
            )}
        </div>
    );
};
