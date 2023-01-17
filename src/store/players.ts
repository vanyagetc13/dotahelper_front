import { makeAutoObservable } from "mobx";
import { IPlayerInfo } from "../types/player";
import axios from "../axios";

class Player {
    playerList: IPlayerInfo[] = [];
    isAuth: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    addPlayer(playerdata: IPlayerInfo) {
        this.playerList.push(playerdata);
    }

    fetchPlayers = async () => {
        try {
            const response = await axios.get("/players");
            this.playerList = response.data;
        } catch (error) {
            console.log(error);
        }
    };
}

export default new Player();
