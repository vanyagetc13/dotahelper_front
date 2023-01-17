import React, { useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router";

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
        }
    }
    return (
        <div>
            <input
                type="text"
                placeholder="Введите Ваш Email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <input
                type="password"
                placeholder="Введите Ваш пароль"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button onClick={clickHandler}>Войти</button>
        </div>
    );
};

export default LoginPage;
