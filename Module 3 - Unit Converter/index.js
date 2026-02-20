const meterToFeet = 3.281;
const literToGallon = 0.264;
const kilogramToPound = 2.204;

const inputEl = document.getElementById("input-el");
const convertBtn = document.getElementById("convert-btn");
const lengthOutput = document.getElementById("length-output");
const volumeOutput = document.getElementById("volume-output");
const massOutput = document.getElementById("mass-output");

function outputUpdate(){
	let num = inputEl.value;
	lengthOutput.textContent = num + " meters = " + (num * meterToFeet).toFixed(3) + " feet | " + num + " feet = " +  (num / meterToFeet).toFixed(3) + " meters";
	volumeOutput.textContent = num + " liters = " + (num * literToGallon).toFixed(3) + " gallons | " + num + " gallons = " +  (num / literToGallon).toFixed(3) + " liters";
	massOutput.textContent = num + " kilograms = " + (num * kilogramToPound).toFixed(3) + " Pounds | " + num + " Pounds = " +  (num / kilogramToPound).toFixed(3) + " kilograms";
};

convertBtn.addEventListener("click", () => {
	if(inputEl.value != "-")
		outputUpdate();
});

inputEl.addEventListener("input", () => {
	let string = "" + inputEl.value;

	console.log(string);
	if(string == "0-") {
		inputEl.value = "-0";
		return;
	}
	if(string == "-") return;

	let processedString = "";
	let canAddMinus = true;

	for(let index = 0; index < string.length && processedString.length < 4; index++){
		if(string[index] == '-'){
			if(canAddMinus) processedString += string[index];
			canAddMinus = false;
		}
		else if('0' <= string[index] && string[index] <= '9'){
			processedString += string[index];
			canAddMinus = false;
		}
	}

	processedString = Number(processedString);
	if(processedString < -99) processedString = "-99";
	if(processedString > 999) processedString = "999";
	inputEl.value = processedString;
});


window.addEventListener("load", () => {
	inputEl.value = "20";
	outputUpdate();
});
