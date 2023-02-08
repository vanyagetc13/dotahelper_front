import React, { useEffect, useState } from "react";
import PlayerList from "../../components/Lists/PlayerList";
import players from "../../store/players";
import styles from "./RandomizerPage.module.scss";
import { useNavigate } from "react-router";
import axios from "../../axios";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import IMove from "./../../types/movement";
import PlayerCreation from "../../components/Modals/PlayerCreationModal/PlayerCreation";
import MyButton from "../../components/UI/MyButton/MyButton";
import RandomedPlayersModal from "../../components/Modals/RandomedPlayersModal/RandomedPlayersModal";
import { observer } from "mobx-react-lite";

const RandomizerPage = observer(() => {
    const [playerCreationModalisOn, setPlayerCreationModalisOn] =
        useState(false);
    const [randomedPlayerModalIsOn, setRandomedPlayerModalIsOn] =
        useState(false);

    const nav = useNavigate();

    const onDragEndHandle = (result: DropResult) => {
        if (!result.destination) return;
        const from: IMove = {
            index: result.source.index,
            list: result.source.droppableId,
        };
        const to: IMove = {
            index: result.destination.index,
            list: result.destination.droppableId,
        };
        players.move(from, to);
    };

    const playerCreationHandler = () => {
        setPlayerCreationModalisOn(true);
    };
    const playerCreationAbortion = () => {
        setPlayerCreationModalisOn(false);
    };

    const randomPlayersHandler = () => {
        const response = players.randomPlayers();
        console.log(response);
        setRandomedPlayerModalIsOn(true);
    };
    const randomPlayerAbortion = () => {
        setRandomedPlayerModalIsOn(false);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (user) {
            axios.defaults.headers["authorization"] = user.token;
            players.fetchPlayers();
        } else nav("/login");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {playerCreationModalisOn && (
                <PlayerCreation
                    abort={playerCreationAbortion}
                    title={"Создание персонажа"}
                />
            )}
            {randomedPlayerModalIsOn && (
                <RandomedPlayersModal
                    abort={randomPlayerAbortion}
                    title={"random.org выбрал команды"}
                />
            )}
            <DragDropContext onDragEnd={onDragEndHandle}>
                <div className={styles.wrapper}>
                    <div className={styles.column}>
                        <div>
                            <h4>Переместите сюда игроков</h4>
                            <Droppable droppableId="randomList">
                                {(provided) => (
                                    <div
                                        className={styles.list}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <PlayerList list={players.randomPlayerList} />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <MyButton click={randomPlayersHandler}>
                            Сгенерировать случайные команды
                        </MyButton>
                    </div>
                    <div className={styles.column}>
                        <div>
                            <h4>Игроки</h4>
                            <Droppable droppableId="playerList">
                                {(provided) => (
                                    <div
                                        className={styles.list}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <PlayerList list={players.playerList} />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <MyButton click={playerCreationHandler}>
                            Добавить игрока
                        </MyButton>
                    </div>
                </div>
            </DragDropContext>
        </>
    );
});

export default RandomizerPage;
