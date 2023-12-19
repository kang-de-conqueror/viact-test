"use client";
import cookie from "js-cookie";
import classes from "./header-user.module.css";

type Props = {
    name: string;
};

export const HeaderUser = ({ name }: Props) => {
    const onLogout = () => {
        cookie.remove("accessToken");
        window.location.reload();
    };

    return (
        <div className={classes.root}>
            <p className={classes.welcomeMsg}>
                Welcome <span>{name}</span>
            </p>
            <button onClick={onLogout} className={classes.btnLogout}>
                Logout
            </button>
        </div>
    );
};
