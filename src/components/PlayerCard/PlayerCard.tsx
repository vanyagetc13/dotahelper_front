import React from "react";
import styles from "./PlayerCard.module.scss";
import { IPlayerInfo } from "./../../types/player";

interface PlayerCardProps {
    playerinfo: IPlayerInfo;
}

const PlayerCard = ({playerinfo}:PlayerCardProps) => {
    const {fullName} = playerinfo;
    return (
        <div className={styles.card}>
            <div>
                <span>{fullName}</span>
            </div>
            <button> + </button>
        </div>
    );
};

export default PlayerCard;
