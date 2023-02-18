const findInArray = (searchElement, searchList, index=false) => {
    for (var i = 0; i < searchList.length; i++){
        if (JSON.stringify(searchElement) === JSON.stringify(searchList[i]))
            if (index) return i;
            return true;
    }
    return false;
}

const getCount = (countElement, countList) => {
    let count = 0;
    countList.map(elem => {
        if (JSON.stringify(countElement) === JSON.stringify(elem)) count++;
    });
    return count;
}

module.exports = {findInArray, getCount};
