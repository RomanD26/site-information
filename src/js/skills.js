const item = document.querySelectorAll('.skills-container__item');
const canvas = document.querySelectorAll(".skills-container__canvas");

for(let i = 0; i < item.length; i++) {
	item[i].addEventListener('mouseenter',(e)=> {
		item[i].children[1].style.opacity = 1;
		item[i].children[1].style.visibility = "visible";
	})
	item[i].addEventListener('mouseleave',()=> {
		item[i].children[1].style.opacity = 0;
		item[i].children[1].style.visibility = "hidden";
	})
}

// перевод градусов в радианы
function getRadians(degrees) {
	return (Math.PI / 180) * degrees;
}

function showSkillsCanvas() {
	let param = 0;
	for(let i = 0; i < canvas.length; i++) {
		param = +canvas[i].dataset.percent;
		let ctx = canvas[i].getContext('2d');
		ctx.lineWidth = 10; // толщина обводки
		ctx.strokeStyle = "red";
		ctx.translate(0, 140);
		ctx.rotate(getRadians(-90));
		ctx.arc(70, 70, 50, 0, getRadians(360*param*0.01)); 
		
		ctx.stroke();
	}
}

showSkillsCanvas();
