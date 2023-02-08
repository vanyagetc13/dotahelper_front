import React from "react";
import styles from "./MyModalWrapper.module.scss";

interface MyModalWrapperProps {
    children: React.ReactNode;
    abort: () => any;
    title: string;
}

const MyModalWrapper = ({ children, abort, title }: MyModalWrapperProps) => {
    return (
        <div onClick={abort} className={styles.wrapper}>
            <div
                className={styles.modal}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <h4>{title}</h4>
                {children}
            </div>
        </div>
    );
};

export default MyModalWrapper;
