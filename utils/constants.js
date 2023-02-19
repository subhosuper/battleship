const GRID_X = 10;
const GRID_Y = 10; 
const TOTAL_SHIP_COUNT = 10;
let TOTAL_UNITS_OF_ALL_SHIPS = 0 ; 

const shipTypeCounts = {
    "battleship": 1,
    "cruiser": 2,
    "destroyer": 3,
    "submarine": 4
}

const SHIP_SIZE = {
    "battleship": 4,
    "cruiser": 3,
    "destroyer": 2,
    "submarine": 1
}

Object.keys(shipTypeCounts).forEach(el => TOTAL_UNITS_OF_ALL_SHIPS += SHIP_SIZE[el]*shipTypeCounts[el]); 
console.log("Total units of all ships: ", TOTAL_UNITS_OF_ALL_SHIPS)

const ground = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]

const HIT = {"color": "red", value: 1};
const MISS = {"color": "blue", value: 2};

const gameState = {
    "battleship-1": {hits: 0, size: 4},
    "cruiser-1": {hits: 0, size: 3},
    "cruiser-2": {hits: 0, size: 3},
    "destroyer-1": {hits: 0, size: 2},
    "destroyer-2": {hits: 0, size: 2},
    "destroyer-3": {hits: 0, size: 2},
    "submarine-1": {hits: 0, size: 1},
    "submarine-2": {hits: 0, size: 1},
    "submarine-3": {hits: 0, size: 1},
    "submarine-4": {hits: 0, size: 1},
    "sunk": 0,
    "miss": [], // store co-ordinates of the missed attacks
    "hit": []   // store co-ordinates of the hit attacks 
};

exports.constants = {GRID_X, GRID_Y, TOTAL_SHIP_COUNT, shipTypeCounts, TOTAL_UNITS_OF_ALL_SHIPS, SHIP_SIZE};
