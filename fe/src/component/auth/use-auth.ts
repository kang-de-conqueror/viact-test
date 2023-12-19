import { useMutation } from "@apollo/client";
import {
    LOGIN_MUTATION,
    REGISTER_MUTATION,
} from "@/graphql/mutations/auth.mutation";
import { useRef, useState } from "react";
import _ from "lodash";
import { TInputField, loginFields, registerFields } from "./auth.constant";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";

export enum AuthPage {
    Login = "Login",
    Register = "Register",
}

const getFieldNames = (fields: TInputField[]) => fields.map(({ name }) => name);

export const useAuth = () => {
    const router = useRouter();

    const [loginMutation] = useMutation(LOGIN_MUTATION);
    const [registerMutation] = useMutation(REGISTER_MUTATION);
    const [page, setPage] = useState(AuthPage.Login);
    const formRef = useRef<HTMLFormElement>(null);

    const switchPage = () => {
        setPage((prev) =>
            prev === AuthPage.Login ? AuthPage.Register : AuthPage.Login
        );
    };

    const onAuthSuccess = (data: { accessToken: string }) => {
        cookies.set("accessToken", data.accessToken);
        router.push("/");
        router.refresh();
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const fieldValues = Object.fromEntries(formData.entries());

        const input = _.pick(
            fieldValues,
            page === AuthPage.Login
                ? getFieldNames(loginFields)
                : [
                      ...getFieldNames(loginFields),
                      ...getFieldNames(registerFields),
                  ]
        );

        const mutationMapper = {
            [AuthPage.Login]: loginMutation,
            [AuthPage.Register]: registerMutation,
        };
        try {
            console.log(`------------- ${JSON.stringify(input, null, 2)}`)
            await mutationMapper[page]({
                variables: input,
                onCompleted: (data) => {
                    onAuthSuccess(data[page.toLowerCase()]);
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        page,
        formRef,
        switchPage,

        onSubmit,
    };
};
