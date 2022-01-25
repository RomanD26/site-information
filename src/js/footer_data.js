
function showDataFooter() {
	let data = document.querySelector('.footer-bottom__copyright');
	Data = new Date();
	Year = Data.getFullYear();

	data.innerHTML = `&copy;&nbsp; ${(Year)} г.`;
}

showDataFooter();