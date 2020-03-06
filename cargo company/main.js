/**
 * @author Rafael Pinheiro
 * @since 12/07/2019
 * @version 2.0
 */

let trucks = {
    description: "Caminhão",
    maxWeight: 12000,
    vehicles: []
};

let kombis = {
    description: "Kombi",
    maxWeight: 5000,
    vehicles: []
};

let vans = {
    description: "Van",
    maxWeight: 3000,
    vehicles: []
};

let motorcycles = {
    description: "Moto",
    maxWeight: 45,
    vehicles: []
};

let items = [];

let typeOfVehicle = [motorcycles, vans, kombis, trucks];

function controller() {
    let result = "Resultado: \n";
    getData();
    for (let i = 0; i < items.length; i++) {
        distributeItemsBetweenVehicles(items[i]);
    }
    showResult();
    resetArrays();
}

function showResult() {
    finalResult = "Resultado : \n";
    for (let i = 0; i < typeOfVehicle.length; i++) {
        finalResult += toStringVehicleType(typeOfVehicle[i]);
    }
    finalResult += "\nCapacidade total: " + calculateTotalCapacity() + "kg";
    finalResult += "\nPeso total: " + calculateItemsTotalWeight() + "kg";
    finalResult += "\nEspaço de sobra: " + calculateRemainingSpace() + "kg";
    finalResult += "\nPorcentual carregado: " + calculateSpaceUsed() + "%";
    document.getElementById("result-text").value = finalResult;
}

function resetArrays() {
    for (let i = 0; i < typeOfVehicle.length; i++) {
        typeOfVehicle[i].vehicles = [];
    }
    items = [];
}

function toStringVehicleType(vehicleType) {
    let result = "";
    for (let i = 0; i < vehicleType.vehicles.length; i++) {
        let unit = vehicleType.vehicles[i];
        result += vehicleType.description + " " + (i + 1) + ": \n";
        for (let j = 0; j < unit.length; j++) {
            let item = unit[j];
            result += toString(item);
        }
    }
    return result;
}

function toString(item) {
    return item.weight + "Kg " + item.description + "\n";
}

function getData() {
    let data = document.getElementById("data").value;
    const regExp = /('[0-9]{1,5}KG[A-z À-ú0-9]{1,50}', 'gim')/;
    debugger;
    let stringArray = data.match(regExp);
    for (let i = 0; i < stringArray.length; i++) {
        let index = stringArray[i].toLowerCase().indexOf("k");
        let weight = Number(stringArray[i].substring(0, index));
        let description = stringArray[i].substring(index + 2).trim();
        items.push({
            weight,
            description
        });
    }
}

function clearTextArea() {
    document.getElementById("data").value = "";
    document.getElementById("result-text").value = "";
}

function distributeItemsBetweenVehicles(item) {
    for (let i = 0; i < typeOfVehicle.length; i++) {
        if (item.weight <= typeOfVehicle[i].maxWeight) {
            distributeItemInVehicle(typeOfVehicle[i], item);
            return;
        }
    }
}

function distributeItemInVehicle(vehicleType, item) {
    if (!vehicleType.vehicles.length) { //is empty
        vehicleType.vehicles.push([item]);
        return;
    }
    for (let i = 0; i < vehicleType.vehicles.length; i++) {
        if (calculateWeightInVehicle(vehicleType.vehicles[i]) + item.weight <= vehicleType.maxWeight) {
            vehicleType.vehicles[i].push(item);
            return;
        }
    }
    vehicleType.vehicles.push([item]);
}

function calculateWeightInVehicle(itensInVehicle) {
    let totalWeight = 0;
    for (let i = 0; i < itensInVehicle.length; i++) {
        totalWeight += itensInVehicle[i].weight;
    }
    return totalWeight;
}

function calculateTotalCapacity() {
    let totalCapacity = 0;
    for (let i = 0; i < typeOfVehicle.length; i++) {
        totalCapacity += typeOfVehicle[i].vehicles.length * typeOfVehicle[i].maxWeight;
    }
    return totalCapacity;
}

function calculateSpaceUsed() {
    return ((calculateItemsTotalWeight() * 100) / calculateTotalCapacity()).toFixed(2);
}

function calculateRemainingSpace() {
    return calculateTotalCapacity() - calculateItemsTotalWeight();
}

function calculateItemsTotalWeight() {
    let itemsTotalWeight = 0;
    for (let i = 0; i < typeOfVehicle.length; i++) {
        itemsTotalWeight += typeOfVehicle[i].vehicles[0] ? calculateWeightInVehicleType(typeOfVehicle[i]) : 0;
    }
    return itemsTotalWeight;
}

function calculateWeightInVehicleType(vehicleType) {
    let totalWeight = 0;
    for (let i = 0; i < vehicleType.vehicles.length; i++) {
        let itensInVehicle = vehicleType.vehicles[i];
        totalWeight += calculateWeightInVehicle(itensInVehicle);
    }
    return totalWeight;
}