import { IForgotForm } from "@/enum/auth";
import { VerifyOTP } from "@/services/auth";
import React, { useRef, RefObject, useEffect, ClipboardEvent } from "react";
import toast from "react-hot-toast";
import { IOtpRes } from "./forgot-container";
import ResentOTPButton from "./resent-otp-button";
import { set } from "nprogress";
interface ConfirmOtpFormProps {
    setForm: (form: IForgotForm) => void;
    otpRes: IOtpRes;
    setOtpRes: React.Dispatch<React.SetStateAction<IOtpRes>>;
}
const ConfirmOtpForm = ({ setForm, otpRes, setOtpRes }: ConfirmOtpFormProps) => {
    const inputsRef = useRef<Array<HTMLInputElement>>([]);
    const [loading, setLoading] = React.useState(false);
    const [code, setCode] = React.useState<string>("");
    const focusNextInput = (index: number) => {
        console.log("focusNextInput", index);
        if (index < 5) {
            inputsRef.current[index + 1].focus();
        }
        setCode(inputsRef.current.map((input) => input.value).join(""));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const otp = inputsRef.current.map((input) => input.value).join("");
        const res = await VerifyOTP(otpRes.email, otp);
        if (res.status === 200) {
            toast.success("Xác thực thành công, vui lòng đặt lại mật khẩu");
            setOtpRes({ ...otpRes, token: res.data.token });
            setForm("reset-password");
        } else {
            toast.error("Mã OTP không chính xác");
        }
        setLoading(false);
    };
    useEffect(() => {
        const handlePaste = (e: any) => {
            e.preventDefault();
            if (e.clipboardData) {
                const pastedText = e.clipboardData.getData("text");
                if (pastedText.length === 6 && pastedText.match(/^[0-9]*$/)) {
                    inputsRef.current.forEach((input, index) => {
                        input.value = pastedText[index];
                    });
                    setCode(pastedText);
                }
            }
        };
        window.addEventListener("paste", handlePaste);
        return () => {
            window.removeEventListener("paste", handlePaste);
        };
    }, []);

    return (
        <div className=" mx-auto text-center  p-4  ">
            <p className="text-sm text-title mb-3 ">
                Nhập 6 số vừa được gửi đến email <b>{otpRes.email}</b>
                <br />
                <span className="text-xs"> Vui lòng kiểm tra cả bên trong thư rác</span>
            </p>
            <form onSubmit={handleSubmit} id="otp-form">
                <div className="flex items-center justify-center gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            type="text"
                            name={"otp" + index}
                            key={index}
                            onKeyDown={(e) => {
                                if (inputsRef.current[index].value.length === 0 && e.key === "Backspace") {
                                    focusNextInput(index === 0 ? index - 1 : index - 2);
                                } else {
                                    if (!e.key.match(/^[0-9]$/) && e.key !== "Backspace" && e.key !== "Delete") {
                                        e.preventDefault();
                                    }
                                }
                            }}
                            ref={(el: HTMLInputElement) => (inputsRef.current[index] = el)}
                            onChange={(e) => {
                                if (e.target.value.length > 0) {
                                    focusNextInput(index);
                                }
                            }}
                            className="size-12 text-center text-xl font-extrabold text-default bg-dark4   appearance-none rounded p-4 outline-none border border-transparent focus:border-mainColor "
                            pattern="\d*"
                            maxLength={1}
                            onFocus={(e) => {
                                e.target.select();
                            }}
                        />
                    ))}
                </div>
                <div className="max-w-[260px] mx-auto mt-4">
                    {loading ? (
                        <div className="loadingText cursor-wait text-center bg-mainColor/90  w-full p-2 text-sm text-des uppercase font-bold tracking-wider" />
                    ) : (
                        <button
                            type="submit"
                            disabled={code.length < 6}
                            className="w-full inline-flex disabled:bg-mainColor/50 justify-center whitespace-nowrap rounded-lg bg-mainColor/90 px-3.5 py-2.5 text-sm font-medium text-des shadow-sm shadow-indigo-950/10 hover:bg-mainColor focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                        >
                            Xác thực
                        </button>
                    )}
                </div>
            </form>
            <ResentOTPButton setOtpRes={setOtpRes} otpRes={otpRes} />
        </div>
    );
};

export default ConfirmOtpForm;
