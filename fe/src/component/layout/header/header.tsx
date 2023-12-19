import React from "react";
import Link from "next/link";
import classes from "./header.module.css";
import { cookies } from "next/headers";
import { ServerSideApi } from "@/graphql/api/server-side.api";
import { HeaderUser } from "./header-user";

const dataMenu = [
    {
        id: 1,
        name: "Home",
        url: "/",
    },
    {
        id: 2,
        name: "Search",
        url: "/search",
    },
];

const Header = async () => {
    const accessToken = cookies().get("accessToken")?.value;
    const currentUser = await ServerSideApi.getCurrentUser(accessToken);

    const menuLinks = dataMenu.map((item) => {
        const { id, name, url } = item;

        return (
            <li className={classes.menuItem} key={`menu-item-${id}`}>
                {url ? (
                    <Link href={url}>{name}</Link>
                ) : (
                    <p className={classes.menuItem}>{name}</p>
                )}
            </li>
        );
    });

    return (
        <header className={classes.root}>
            <div className="container">
                <div className={classes.main}>
                    <nav className={classes.navigation}>
                        <ul className={classes.menuList}>{menuLinks}</ul>
                    </nav>

                    <div className={classes.right}>
                        {(!currentUser && (
                            <Link href={"/auth"} className={classes.btnLogin}>
                                Login
                            </Link>
                        )) || <HeaderUser name={currentUser?.name} />}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
