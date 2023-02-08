import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router";
import players from "../../store/players";
import MyInput from "./../../components/UI/MyInput/MyInput";
import MyButton from "./../../components/UI/MyButton/MyButton";

import styles from "./LoginPage.module.scss"

const LoginPage = () => {
    const nav = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const clickHandler = async () => {
        const res = await axios.post('/auth/login', {
            email: email,
            password: password
        })
        if(res.status === 200){
            localStorage.setItem('user', JSON.stringify(res.data))
            nav("/randomizer")
            players.isAuth = true;
        }
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if(user) {

        }
    },[])
    return (
        <div className={styles.wrapper}>
            <MyInput
                type="text"
                placeholder="Введите Ваш Email"
                value={email}
                change={(e) => {
                    setEmail(e.currentTarget.value);
                }}
            />
            <MyInput
                type="password"
                placeholder="Введите Ваш пароль"
                value={password}
                change={(e) => {
                    setPassword(e.currentTarget.value);
                }}
            />
            <MyButton click={clickHandler}>Войти</MyButton>
        </div>
    );
};

export default LoginPage;
