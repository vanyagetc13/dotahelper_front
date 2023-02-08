import { makeAutoObservable } from "mobx";
import { IPlayerInfo } from "../types/player";
import axios from "../axios";
import IMove from "./../types/movement";

class Player {
    playerList: IPlayerInfo[] = [];
    randomPlayerList: IPlayerInfo[] = [];
    isAuth: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    addPlayer(playerdata: IPlayerInfo) {
        this.playerList.push(playerdata);
    }

    move(from: IMove, to: IMove) {
        if (from.list === to.list) {
            const list = from.list;
            if (list === "randomList") {
                const [temp] = this.randomPlayerList.splice(from.index, 1);
                this.randomPlayerList.splice(to.index, 0, temp);
            }
            if (list === "playerList") {
                const [temp] = this.playerList.splice(from.index, 1);
                this.playerList.splice(to.index, 0, temp);
            }
        } else {
            if (from.list === "playerList") {
                const [temp] = this.playerList.splice(from.index, 1);
                this.randomPlayerList.splice(to.index, 0, temp);
            }
            if (from.list === "randomList") {
                const [temp] = this.randomPlayerList.splice(from.index, 1);
                this.playerList.splice(to.index, 0, temp);
            }
        }
    }

    fetchPlayers = async () => {
        try {
            const response = await axios.get("/players");
            this.playerList = response.data;
        } catch (error) {
            console.log(error);
        }
    };

    randomPlayers = async () => {
        if (
            this.randomPlayerList.length % 2 === 0 &&
            this.randomPlayerList.length > 1
        ) {
            const response = await axios.post("/random", {
                amount: this.randomPlayerList.length,
            });
            const data = response.data.result.random.data[0];
            let playerList = [];
            for (let index = 0; index < data.length; index++) {
                playerList.push(this.randomPlayerList[data[index] - 1]);
            }
            return playerList;
        }
        return false;
    };
}

const playerStore = new Player();
export default playerStore;
