
const text = [
	'Welcome! \n',
	'Добро пожаловать!'
];
  
  
let line = 0;
let count = 0;
let result = '';
function getPrintHello() {
	let interval = setTimeout(() => {
		result += text[line][count];
		document.querySelector(".info__print").innerHTML = result + ' |';
		count++;
		if (count >= text[line].length) {
			count = 0;
			line++;
			if (line == text.length) {
				clearTimeout(interval);
				document.querySelector(".info__print").innerHTML = result;
				return true;
			}
		}
		getPrintHello();
	}, getRandomInt(getRandomInt(300*3)))
}

getPrintHello();
  
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}