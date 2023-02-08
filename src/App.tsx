import React, { useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./App.scss";
import AboutPage from "./pages/AboutPage/AboutPage";
import RandomizerPage from "./pages/RandomizerPage/RandomizerPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import players from "./store/players";
import axios from "./axios";
import { observer } from "mobx-react-lite";

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AboutPage />} />
                    <Route path="/randomizer" element={<RandomizerPage />} />
                    <Route path="/login" element={<LoginPage />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

const Layout = observer(function () {
    const nav = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("user");
        axios.defaults.headers["authorization"] = "";
        players.isAuth = false;
        nav("/");
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (user) {
            axios.defaults.headers["authorization"] = user.token;
            players.isAuth = true;
        }
    }, []);
    return (
        <>
            <header>
                <nav>
                    <Link to={"/"}>Главная</Link>
                    <Link to={"/randomizer"}>Генератор команд</Link>
                    {players.isAuth ? (
                        <button onClick={logoutHandler}>Выйти</button>
                    ) : (
                        <Link to={"/login"}>Войти</Link>
                    )}
                </nav>
            </header>
            <div className="wrapper">
                <Outlet />
            </div>
        </>
    );
});
