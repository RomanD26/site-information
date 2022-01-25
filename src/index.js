import Swiper from 'swiper/bundle';
import './js/bg_scroll.js';
import './js/footer_data.js';
// import './js/form.js';
import './js/page_scroll.js';
import './js/skills.js';
import './js/top_scroll.js';
import './js/welcome.js';
import './styles/styles.scss';

new Swiper('.swiper', {
	parallax: true,
	speed: 1500,
	direction: 'horizontal',
	loop: true,
	centeredSlides: true,
	slidesPerView: 1,
	spaceBetween: 20,
   
	 pagination: {
	   el: '.swiper-pagination',
	   clickable: true,
	   dynamicBullets: true,
	   renderBullet: function(index, className) {
		   return '<span class="' + className + '">' + (index + 1) + '</span>';
	   }
	 },
   
	 navigation: {
	   nextEl: '.swiper-button-next',
	   prevEl: '.swiper-button-prev',
	 },
});

