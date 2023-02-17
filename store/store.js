// import {GRID_X, GRID_Y, shipTypeCounts, ground, HIT, MISS, gameState} from '../utils/constants';
const {GRID_X, GRID_Y, shipTypeCounts, ground, HIT, MISS, gameState} = require("../utils/constants");

class Store {
    constructor(){
        this.GRID_X = GRID_X;
        this.GRID_Y = GRID_Y;
        this.shipTypeCounts = shipTypeCounts;
        this.ground = ground;
        this.gameState = gameState;
        console.log("store initialised")
    }

    getGameState(){
        return this.gameState;
    }
    

}

const storeObj = new Store();

module.exports = storeObj;