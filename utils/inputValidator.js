const Validator = require('validatorjs');
const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

Validator.registerAsync('restrict', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: restrict:length:2,type:number');
    //split table and column
    let attArr = attribute.split(",");
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

    //assign array index 0 and 1 to table and column respectively
    const {0: length, 1: type} = attArr;

    //define custom error message
    let msg = value.length != parseInt(length.split(":")[1]) ? "Two values for X and Y coordinates are required. " : "";
    for (val of value){
        msg += typeof(val) !== type.split(":")[1] ? "Coordinates should of type number. " : "";
        msg += Math.sign(val) !== 1 ? "Coordinate values should be a positive number." : "";
    }
    if (msg) {
        passes(false, msg);
        return;
    }
    passes();
});

Validator.registerAsync('choices', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: restrict:length:2,type:number');
    //split table and column
    let attArr = attribute.split(",");
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

    //assign array index 0 and 1 to table and column respectively
    let msg = "";
    if (!(attArr.includes(value))) {
        msg = "Direction can either be horizontal or vertical"
    }

    //define custom error message
    if (msg) {
        passes(false, msg);
        return;
    }
    passes();
});

module.exports = validator;
