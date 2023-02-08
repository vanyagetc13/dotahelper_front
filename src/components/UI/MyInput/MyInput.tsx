import React from "react";

import styles from "./MyInput.module.scss";

interface MyInputProps {
    type?: string;
    value: string;
    change: (e: React.FormEvent<HTMLInputElement>) => any;
    placeholder?: string;
}

const MyInput = ({
    type = "text",
    placeholder,
    value,
    change,
}: MyInputProps) => {
    return (
        <input
            className={styles.input}
            type={type}
            onChange={change}
            placeholder={placeholder || ""}
            value={value}
        />
    );
};

export default MyInput;
