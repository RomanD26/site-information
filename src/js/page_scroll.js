
let menuY = 0;
let scrollY = 0;

window.addEventListener("scroll", function() {
	const menu = document.querySelector('.menu');
	const height = menu.offsetHeight;
	const pos = window.pageYOffset;
	const diff = scrollY - pos;

	menuY = Math.min(0, Math.max(-height, menuY + diff));
	menu.style.position = pos >= height ? 'fixed' : pos === 0 ? 'absolute' : menu.style.position;
	menu.style.transform = `translateY(${menu.style.position === 'fixed' ? menuY : 0}px)`;

	scrollY = pos;
})