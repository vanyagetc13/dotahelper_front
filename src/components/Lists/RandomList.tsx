import React, { FC } from "react";
import players from "../../store/players";
import { observer } from "mobx-react-lite";
import { Draggable } from "react-beautiful-dnd";
import PlayerCard from "../PlayerCard/PlayerCard";
import { IPlayerInfo } from "../../types/player";

const RandomList: FC = observer(() => {
    return (
        <>
            {players.randomPlayerList.map((player:IPlayerInfo, index:number) => (
                <Draggable
                    key={player.steamId}
                    draggableId={player.steamId}
                    index={index}
                >
                    {(provided) => (
                        <PlayerCard
                            playerinfo={player}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            innerRef={provided.innerRef}
                        />
                    )}
                </Draggable>
            ))}
        </>
    );
});

export default RandomList;
