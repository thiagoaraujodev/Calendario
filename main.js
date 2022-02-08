document.getElementById('year').innerHTML = 'Calendário de ' + new Date().getFullYear();

const currentYear = new Date().getFullYear();
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const months = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
];
const colors = ['#2d6b5f', '#72e3a6', '#dff4c7', '#edbf98', '#ea3d36'];
const defaultColor = '#888';
let activeColor = '';

const calendar = document.getElementById('calendar');
const moods = document.querySelectorAll('.mood');
const randomize = document.querySelector('#randomize');
const clear = document.querySelector('#clear');

moods.forEach(mood => {
	mood.addEventListener('click', () => {
		// marca e desmarca o selecionado
		if (mood.classList.contains('selected')) {
			mood.classList.remove('selected');
			activeColor = defaultColor;
		} else {
			moods.forEach(mood => {
				mood.classList.remove('selected');
			});

			mood.classList.add('selected');
			activeColor = getComputedStyle(mood).getPropertyValue('color');
		}
	});
});

const getAllDays = year => {
	// pega o 1 dia do ano
	const firstDay = new Date(`January 1 ${year}`);
	// pega o ultimo dia do ano
	const lastDay = new Date(`December 31 ${year}`);

	// Add primeiro dia
	const days = [firstDay];

	// Repete enquanto houver dias a serem adicionados no ano atual
	let lastDayInArray = firstDay;
	while (lastDayInArray.getTime() !== lastDay.getTime()) {
		days.push(addDays(lastDayInArray, 1));
		lastDayInArray = days[days.length - 1];
	}

	return days;
};

const dates = getAllDays(currentYear);

let monthsHTML = '';

// Faz um loop nos meses e crie um div para cada mês
months.forEach((month, idx) => {
	monthsHTML += `<div class="months month_${idx}">
        <h3>${month}</h3>
        <div class="week_days_container">
            ${weekDays.map(day => `<div class="week_days">${day}</div>`).join('')}
        </div>
        <div class="days_container"></div>
    </div>`;
});
calendar.innerHTML = monthsHTML;

// verifica cada dia
dates.forEach(date => {
	const month = date.getMonth();
	const monthEl = document.querySelector(`.month_${month} .days_container`);

	// cria slots de dias extras, se necessário, antes do dia 1
	if (date.getDate() === 1 && date.getDay() !== 0) {
		for (let i = 0; i < date.getDay(); i++) {
			const emptySpot = createEmptySpot();

			monthEl.appendChild(emptySpot);
		}
	}

	const dateEl = createDateEl(date);

	monthEl.appendChild(dateEl);
});

// Add evento .circles
const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
	circle.addEventListener('click', () => {
		circle.style.backgroundColor = activeColor;
	});
});

// Random
randomize.addEventListener('click', () => {
	circles.forEach(circle => {
		circle.style.backgroundColor = getRandomColor();
	});
});
function getRandomColor() {
	return colors[Math.floor(Math.random() * 5)];
}

// Limpa
clear.addEventListener('click', () => {
	circles.forEach(circle => {
		circle.style.backgroundColor = defaultColor;
	});
});

function createDateEl(date) {
	const day = date.getDate();
	const dateEl = document.createElement('div');
	dateEl.classList.add('days');
	dateEl.innerHTML = `<span class="circle">${day}</span>`;

	return dateEl;
}

function createEmptySpot() {
	const emptyEl = document.createElement('div');
	emptyEl.classList.add('days');

	return emptyEl;
}

function addDays(date, days) {
	let result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}
