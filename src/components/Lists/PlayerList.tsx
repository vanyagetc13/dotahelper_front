import React from "react";
import { observer } from "mobx-react-lite";
import { Draggable } from "react-beautiful-dnd";
import PlayerCard from "../PlayerCard/PlayerCard";
import { IPlayerInfo } from "../../types/player";

interface PlayerListProps {
    list: IPlayerInfo[];
}
const PlayerList = observer(({ list }: PlayerListProps) => {
    return (
        <>
            {list.map((player: IPlayerInfo, index: number) => (
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

export default PlayerList;
