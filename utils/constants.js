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


const HIT = {"color": "red", value: 1};
const MISS = {"color": "blue", value: 2};

exports.constants = {GRID_X, GRID_Y, TOTAL_SHIP_COUNT, shipTypeCounts, TOTAL_UNITS_OF_ALL_SHIPS, SHIP_SIZE};
