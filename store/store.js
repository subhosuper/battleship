import {GRID_X, GRID_Y, shipTypeCounts, ground, HIT, MISS, gameState} from '../utils/constants';

class Store {
    constructor(){
        this.GRID_X = GRID_X;
        this.GRID_Y = GRID_Y;
        this.shipTypeCounts = shipTypeCounts;
        this.ground = ground;
        this.gameState = gameState;
    }

    gameState(){
        return this.gameState;
    }
    
    
}