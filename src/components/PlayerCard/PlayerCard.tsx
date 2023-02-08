import React from "react";
import styles from "./PlayerCard.module.scss";
import { IPlayerInfo } from "./../../types/player";

interface PlayerCardProps {
    playerinfo: IPlayerInfo;
    innerRef: any;
    rest?: any[];
}

function PlayerCard ({playerinfo, innerRef, ...rest}:PlayerCardProps){
    const {fullName} = playerinfo;
    return (
        <div className={styles.card} ref={innerRef} {...rest}>
            <div>
                <span>{fullName}</span>
            </div>
        </div>
    );
};

export default PlayerCard;
