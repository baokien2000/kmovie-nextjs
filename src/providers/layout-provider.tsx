import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/auth-provider";
import ReactQueryProvider from "./react-query-provider";
import Header from "@/containers/header";
import { HandleOnComplete } from "@/lib/router-events";
import Footer from "@/containers/footer";

const LayoutProvider = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <ReactQueryProvider>
                <Header />
                <div className=" max-w-screen-laptop flex-1 mx-auto w-full h-full  ">{children}</div>
            </ReactQueryProvider>
            <AuthProvider />
            <Toaster toastOptions={{ duration: 5000 }} containerClassName="text-xs sm:text-sm " />
            <Footer />
            <HandleOnComplete />
        </>
    );
};

export default LayoutProvider;
