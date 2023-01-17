import React from "react";
import { Outlet, Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import "./App.scss";
import AboutPage from "./pages/AboutPage/AboutPage";
import RandomizerPage from "./pages/RandomizerPage/RandomizerPage";
import LoginPage from "./pages/LoginPage/LoginPage";

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AboutPage />} />
                    <Route path="/randomizer" element={<RandomizerPage />} />
                    <Route path="/login" element={<LoginPage />}>

                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

function Layout() {
    return (
        <>
            <header>
                <nav>
                    <Link to={"/"}>Главная</Link>
                    <Link to={"/randomizer"}>Генератор команд</Link>
                    <button>Войти</button>
                </nav>
            </header>
            <div className="wrapper">
                <Outlet />
            </div>
        </>
    );
}
