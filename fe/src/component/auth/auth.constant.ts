export type TInputField = {
    label: string;
    name: string;
    type: string;
};

export const loginFields: TInputField[] = [
    {
        label: "username",
        name: "username",
        type: "text",
    },
    {
        label: "password",
        name: "password",
        type: "password",
    },
];
export const registerFields: TInputField[] = [
    {
        name: "passwordConfirm",
        label: "Confirm Password",
        type: "password",
    },
    {
        label: "Name",
        name: "name",
        type: "text",
    },
];
