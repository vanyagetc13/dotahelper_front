import React, { FC } from "react";
import players from "../../store/players";
import PlayerCard from "./../PlayerCard/PlayerCard";
import { observer } from "mobx-react-lite";

const PlayerList: FC = observer(() => {
    return (
        <>
            {players.playerList.map((player) => (
                <PlayerCard playerinfo={player} key={player.steamId} />
            ))}
        </>
    );
});

export default PlayerList;
