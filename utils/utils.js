const findInArray = (searchElement, searchList, index=false) => {
    for (var i = 0; i < searchList.length; i++){
        if (JSON.stringify(searchElement) === JSON.stringify(searchList[i]))
            if (index) return i;
            return true;
    }
    return false;
}


module.exports = {findInArray};
