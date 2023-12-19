"use client";

import { AuthPage, useAuth } from "@/component/auth/use-auth";
import classes from "./auth.module.css";
import React from "react";
import { TInputField, loginFields, registerFields } from "./auth.constant";
import UncontrolledInput from "../shared/uncontrolled-input";

const AuthComponent = () => {
    const { page, formRef, switchPage, onSubmit } = useAuth();

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.form}>
                    <div className={classes.formHeader}>
                        <div className={classes.formHeaderTitle}>
                            <h1>{page}</h1>
                        </div>
                    </div>
                    <div className={classes.formMain}>
                        <form onSubmit={onSubmit} ref={formRef}>
                            {loginFields?.map((field: TInputField) => (
                                <UncontrolledInput
                                    {...field}
                                    key={field.name}
                                    required
                                />
                            ))}
                            {page === AuthPage.Register && (
                                <React.Fragment>
                                    {registerFields.map(
                                        (field: TInputField) => (
                                            <UncontrolledInput
                                                {...field}
                                                key={field.name}
                                                required
                                            />
                                        )
                                    )}
                                </React.Fragment>
                            )}
                            <div className={classes.formFooter}>
                                <button className={classes.btn} type="submit">
                                    {page === AuthPage.Register
                                        ? "Sign Up"
                                        : "Login"}
                                </button>
                                {page === AuthPage.Login && (
                                    <div className={classes.footer}>
                                        Does not have an account?{" "}
                                        <button onClick={switchPage}>
                                            Register here
                                        </button>
                                    </div>
                                )}
                                {page === AuthPage.Register && (
                                    <div className={classes.footer}>
                                        Already have an account?{" "}
                                        <button onClick={switchPage}>
                                            Login here
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;
