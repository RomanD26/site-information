let goTopBtn = document.querySelector('.footer__container__back-to-top');

// отслеживаем прокрутку документа.
function trackScroll() {
	let scrolled = window.pageYOffset;
	let coords = document.documentElement.clientHeight;

	if (scrolled > coords) {
		goTopBtn.classList.add('footer__container__back-to-top-show');
	}
	if (scrolled < coords) {
		goTopBtn.classList.remove('footer__container__back_to_top-show');
	}
}

// отслеживаем клик по кнопке.
function backToTop() {
	if (window.pageYOffset > 0) {
		window.scrollBy(0, -18); // параметр прокрутки документа за один «шаг»(вызов функции)
		setTimeout(backToTop, 0);
	}
}

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);
