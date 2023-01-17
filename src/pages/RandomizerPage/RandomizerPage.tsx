import React, { useEffect, useState } from "react";
import PlayerList from "../../components/PlayerList/PlayerList";
import players from "../../store/players";
import styles from "./RandomizerPage.module.scss";
import { useNavigate } from "react-router";
import axios from "../../axios";

const RandomizerPage = () => {
    const [name, setName] = useState("");
    const [steamId, setURL] = useState("");
    const [mmr, setMMR] = useState("");

    const nav = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (user) {
            axios.defaults.headers['authorization'] = user.token
            players.fetchPlayers();
        }
        else nav("/login");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="steamId"
                    value={steamId}
                    onChange={(e) => {
                        setURL(e.target.value);
                    }}
                />
                <input
                    type="text"
                    value={mmr}
                    placeholder="mmr"
                    onChange={(e) => {
                        const text = e.target.value;
                        if (text.match(/^[0-9]*$/)) {
                            setMMR(text);
                        }
                    }}
                />
                <button
                    onClick={() => {
                        if (name && steamId && mmr) {
                            const newPlayer = {
                                fullName: name,
                                steamId: steamId,
                                mmr: parseInt(mmr),
                            };
                            axios.post("players", newPlayer).then((res)=>{
                                if(res.status === 200) {

                                }
                            }).catch((err)=>{
                                console.log(err);
                            })


                            // if(res.status === 200) players.addPlayer(newPlayer)
                        }
                    }}
                >
                    Create
                </button>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.column}>
                    <h4>Переместите сюда игроков.</h4>
                </div>
                <div className={styles.column}>
                    <h4>Игроки</h4>
                    <PlayerList />
                </div>
            </div>
        </>
    );
};

export default RandomizerPage;
