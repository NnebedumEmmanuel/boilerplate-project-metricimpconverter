function ConvertHandler() {
  const unitsMap = {
    gal: { returnUnit: "L", spell: "gallons", factor: 3.78541 },
    L: { returnUnit: "gal", spell: "liters", factor: 1 / 3.78541 },
    mi: { returnUnit: "km", spell: "miles", factor: 1.60934 },
    km: { returnUnit: "mi", spell: "kilometers", factor: 1 / 1.60934 },
    lbs: { returnUnit: "kg", spell: "pounds", factor: 0.453592 },
    kg: { returnUnit: "lbs", spell: "kilograms", factor: 1 / 0.453592 },
  };

  this.getNum = function (input) {
    let result;
    const numRegex = /^[^a-zA-Z]*/;
    const numStr = input.match(numRegex)[0];

    if (!numStr) return 1;

    // Check for double fractions
    if (numStr.split("/").length > 2) return "invalid number";

    try {
      result = eval(numStr); // safe here because FCC inputs are numeric or fraction
    } catch (e) {
      return "invalid number";
    }

    return isNaN(result) ? "invalid number" : result;
  };

  this.getUnit = function (input) {
    const unitRegex = /[a-zA-Z]+$/;
    const unitMatch = input.match(unitRegex);
    if (!unitMatch) return "invalid unit";

    let unit = unitMatch[0].toLowerCase();
    if (unit === "l") unit = "L"; // Liter special case

    return unitsMap[unit] ? unit : "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    return unitsMap[initUnit] ? unitsMap[initUnit].returnUnit : "invalid unit";
  };

  this.spellOutUnit = function (unit) {
    return unitsMap[unit] ? unitsMap[unit].spell : "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    if (!unitsMap[initUnit]) return "invalid unit";
    return initNum * unitsMap[initUnit].factor;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitSpelled = this.spellOutUnit(initUnit);
    const returnUnitSpelled = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitSpelled} converts to ${returnNum.toFixed(
      5
    )} ${returnUnitSpelled}`;
  };
}

module.exports = ConvertHandler;
