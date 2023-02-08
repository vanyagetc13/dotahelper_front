import React from "react";
import MyModalWrapper from "../MyModalWrapper/MyModalWrapper";

interface RandomedPlayersModalProps {
    abort: () => any;
    title: string;
}

const RandomedPlayersModal = ({ abort, title }: RandomedPlayersModalProps) => {
    return (
        <MyModalWrapper abort={abort} title={title}>
            <div>

            </div>
        </MyModalWrapper>
    );
};

export default RandomedPlayersModal;
