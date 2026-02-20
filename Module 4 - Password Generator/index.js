const uppercase  = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbol = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];
const passwordLengthRange = document.getElementById("password-length-range");
const passwordLengthText = document.getElementById("password-length-text");
const characters = document.querySelectorAll("ul input");
const uppercaseCheckbox = document.getElementById("uppercase-checkbox");
const lowercaseCheckbox = document.getElementById("lowercase-checkbox");
const numberCheckbox = document.getElementById("number-checkbox");
const symbolCheckbox = document.getElementById("symbol-checkbox");
const password1 = document.getElementById("password-1");
const passwordCopyBtn1 = document.getElementById("password-copy-btn-1");
const password2 = document.getElementById("password-2");
const passwordCopyBtn2 = document.getElementById("password-copy-btn-2");
const generatePasswordBtn = document.getElementById("generate-password-btn");

function numberOfCheckedBoxes(){
	let count = 0;
	for(const character of characters){
		if(character.checked)	count++;
	}
	return count;
}

function createPassword(){
	let password = "";
	let length = passwordLengthRange.value;
	for(let i = 0; i < length; i++){
		password += availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
	}
	return password;
}

passwordLengthText.addEventListener("input", () => {
	let text = passwordLengthText.value;
	let passwordLength = "";
	for(let index = 0; index < text.length; index++)
		if('0' <= text[index] && text[index] <= '9')
			passwordLength += text[index];
	if(Number(passwordLength) > 20) passwordLength = "20";
	else if(Number(passwordLength) < 8) passwordLength = "8";
	passwordLengthText.value = passwordLength;
	passwordLengthRange.value = passwordLengthText.value;
});

passwordLengthRange.addEventListener("input", () =>{
	passwordLengthText.value = passwordLengthRange.value;
});

uppercaseCheckbox.addEventListener("click", () => {
	if(uppercaseCheckbox.checked) return;
	if(numberOfCheckedBoxes() < 1) uppercaseCheckbox.checked = true;
});

lowercaseCheckbox.addEventListener("click", () => {
	if(lowercaseCheckbox.checked) return;
	if(numberOfCheckedBoxes() < 1) lowercaseCheckbox.checked = true;
});

symbolCheckbox.addEventListener("click", () => {
	if(symbolCheckbox.checked) return;
	if(numberOfCheckedBoxes() < 1) symbolCheckbox.checked = true;
});

numberCheckbox.addEventListener("click", () => {
	if(numberCheckbox.checked) return;
	if(numberOfCheckedBoxes() < 1) numberCheckbox.checked = true;
});

passwordCopyBtn1.addEventListener("click", () => {
	try {
		navigator.clipboard.writeText(password1.textContent);
	}
	catch(error) {
		console.error(error.message)
	}
});

passwordCopyBtn2.addEventListener("click", () => {
	try {
		navigator.clipboard.writeText(password2.textContent);
	}
	catch(error) {
		console.error(error.message)
	}
});

generatePasswordBtn.addEventListener("click", () => {
	availableCharacters = [];
	if(uppercaseCheckbox.checked) availableCharacters = availableCharacters.concat(uppercase);
	if(lowercaseCheckbox.checked) availableCharacters = availableCharacters.concat(lowercase);
	if(numberCheckbox.checked) availableCharacters = availableCharacters.concat(number);
	if(symbolCheckbox.checked) availableCharacters = availableCharacters.concat(symbol);
	password1.textContent = createPassword();
	password2.textContent = createPassword();
});

window.addEventListener("load", () => {
	generatePasswordBtn.click();
	passwordLengthText.value = passwordLengthRange.value;
});
