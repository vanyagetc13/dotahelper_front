import React, { useState } from "react";

import styles from "./PlayerCreation.module.scss";
import axios from "../../../axios";
import players from "../../../store/players";
import MyButton from "../../UI/MyButton/MyButton";
import MyInput from "./../../UI/MyInput/MyInput";
import MyModalWrapper from "../MyModalWrapper/MyModalWrapper";

interface PlayerCreationProps {
    abort: () => any;
    title: string;
}

const PlayerCreation = ({ abort, title }: PlayerCreationProps) => {
    const [name, setName] = useState("");
    const [steamId, setURL] = useState("");
    const [mmr, setMMR] = useState("");

    const [error, setError] = useState("");

    const formSubmitHandler = () => {
        if (name && steamId && mmr) {
            const newPlayer = {
                fullName: name,
                steamId: steamId,
                mmr: parseInt(mmr),
            };
            axios
                .post("players", newPlayer)
                .then((res) => {
                    if (res.status === 200) {
                        players.addPlayer(newPlayer);
                        setError("");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    const param = err.response.data[0].param;
                    if (param === "fullName") {
                        setError("Имя должно быть длинной от 3х до 16 букв.");
                    } else if (param === "steamId") {
                        setError("Нужно было указать SteamId игрока.");
                    } else if (param === "mmr") {
                        setError("Укажите действительное значение mmr игрока.");
                    } else setError(err.message);
                });
        }
    };
    return (
        <MyModalWrapper abort={abort} title={title}>
            <form>
                <div className={styles.row}>
                    <h5>Введите имя игрока:</h5>
                    <MyInput
                        type="text"
                        placeholder="Имя"
                        value={name}
                        change={(e) => {
                            setName(e.currentTarget.value);
                        }}
                    />
                </div>
                <div className={styles.row}>
                    <h5>Введите SteamId игрока:</h5>
                    <MyInput
                        type="text"
                        placeholder="steamId"
                        value={steamId}
                        change={(e) => {
                            setURL(e.currentTarget.value);
                        }}
                    />
                </div>
                <div className={styles.row}>
                    <h5>Введите MMR игрока:</h5>
                    <MyInput
                        type="text"
                        value={mmr}
                        placeholder="mmr"
                        change={(e) => {
                            const text = e.currentTarget.value;
                            if (text.match(/^[0-9]*$/)) {
                                setMMR(text);
                            }
                        }}
                    />
                </div>
                <div style={{ paddingTop: "5px" }} className={styles.row}>
                    <div className={styles.error}>
                        <span>{error}</span>
                    </div>
                    <MyButton
                        click={(e) => {
                            e.preventDefault();
                            formSubmitHandler();
                        }}
                    >
                        Создать
                    </MyButton>
                </div>
            </form>
        </MyModalWrapper>
    );
};

export default PlayerCreation;
