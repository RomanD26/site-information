"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault(); // запрещаем стандартную отправку
		let error = formValidate(form);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: FormData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert('Error!');
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}
	}

	function formValidate(form) {
		let formReq = document.querySelectorAll('._requar');
		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			input.parentElement.classList.remove('._error');
			input.classList.remove('._error');
		}
	}
});