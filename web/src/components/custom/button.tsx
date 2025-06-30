import React, { LegacyRef } from "react";
import { IconType } from "react-icons/lib";
import { Spinner } from "./spinner";

type ButtonProps = {
    label: string;
    className?: string;
    iconClassName?: string;
    colored?: boolean;
    color?: string;
    disabled?: boolean;
    loading?: boolean;
    iconAnimate?: boolean;
    iconRight?: boolean;
    gara?: boolean;
    iconMargin?: number;
    makeDarker?: boolean;
    icon?: IconType;
    buttonRef?: LegacyRef<HTMLButtonElement> | undefined;
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export const Button: React.FC<ButtonProps> = ({
    label,
    colored,
    color,
    disabled,
    icon: Icon,
    iconAnimate,
    gara,
    makeDarker,
    loading = false,
    iconRight,
    className,
    iconClassName,
    iconMargin,
    buttonRef,
    ...props
}) => {
    return (
        <button
            disabled={disabled}
            ref={buttonRef}
            style={
                gara
                    ? {}
                    : {
                          fontFamily: "Inter",
                          fontWeight: 444,
                      }
            }
            className={`${
                (loading || disabled) && "cursor-not-allowed"
            } flex items-center justify-center group button-component ${
                colored
                    ? `${
                          color
                              ? color
                              : "bg-primary-blue border-primary-blue text-white"
                      } ${
                          makeDarker
                              ? "hover:bg-primary-blue-dark hover:border-primary-blue-dark"
                              : "hover:opacity-90"
                      } `
                    : "bg-white border-gray-300 hover:bg-gray-50"
            } focus:ring-2 ${
                disabled && "opacity-40 disabled"
            } focus:ring-border-blue-100 transition-all text-[0.84rem] py-1.5 w-full rounded-lg border ${
                gara && "gara"
            }  ${className}`}
            {...props}
        >
            {loading ? (
                <>
                    <Spinner className="w-5 h-5 text-transparent  fill-white" />
                </>
            ) : (
                <>
                    {!iconRight && (
                        <>
                            {Icon && (
                                <Icon
                                    className={`transition-all ${
                                        label.length != 0 &&
                                        `${
                                            iconAnimate
                                                ? `mr-${
                                                      iconMargin
                                                          ? iconMargin
                                                          : "1"
                                                  } group-hover:ml-${
                                                      iconMargin
                                                          ? iconMargin
                                                          : "2"
                                                  }`
                                                : `mr-2`
                                            // : `mr-${
                                            //       iconMargin
                                            //           ? iconMargin
                                            //           : "1"
                                            //   }`
                                        }`
                                    } text-lg ${iconClassName}`}
                                />
                            )}
                        </>
                    )}
                    {label}{" "}
                    {iconRight && (
                        <>
                            {Icon && (
                                <Icon
                                    className={`transition-all ${
                                        label.length != 0 &&
                                        `${
                                            iconAnimate
                                                ? `ml-${
                                                      iconMargin
                                                          ? iconMargin
                                                          : "1"
                                                  } group-hover:ml-${
                                                      iconMargin
                                                          ? iconMargin
                                                          : "2"
                                                  }`
                                                : `ml-${
                                                      iconMargin
                                                          ? iconMargin
                                                          : "1"
                                                  }`
                                        }`
                                    } text-lg ${iconClassName}`}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </button>
    );
};
