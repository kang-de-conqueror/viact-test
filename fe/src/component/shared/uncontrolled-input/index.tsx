import React, { forwardRef, InputHTMLAttributes, memo, useState } from "react";
import classes from "./uncontrolled-input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    classes?: any;
    icon?: Element;
    invalid?: boolean;
    label?: string;
}

const UncontrolledInput = forwardRef<HTMLInputElement, Props>(
    ({ icon = undefined, label, ...otherProps }, ref) => {
        const [value, setValue] = useState<any>("");

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div className={classes.root}>
                <label className={classes.label}>{label}</label>
                <input
                    className={classes.input}
                    value={value}
                    {...otherProps}
                    onChange={onChange}
                    ref={ref}
                />
            </div>
        );
    }
);

UncontrolledInput.displayName = "UncontrolledInput";

export default memo(UncontrolledInput);
