const msgElement = document.querySelector('#msg');

// рандом число от 1 до 100, машина запомнила но никому не сказала
function getRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNum();

/* console.log(randomNum); */

window.RaspoznavanieGolosa =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const raspoznaty = new window.RaspoznavanieGolosa();

// запись пошла, играем
raspoznaty.start();

// вывод записи на экран
function writeMessage(message) {
  msgElement.innerHTML = `
  <div>Вы сказали:</div>
  <span class="box">${message}</span>
  `;
}

// Проверка записи, является ли оно числом
function chechNumber(lalala) {
  const num = Number(lalala);

  // проверка lalala
  if (Number.isNaN(num)) {
    msgElement.innerHTML += `
    <div>Это не число</div>
    `;
    return;
  }
  // проверка диапазона >100 && <0
  if (num > 100 || num < 0) {
    msgElement.innerHTML += `
    <div>Число должно быть от 1 до 100</div>
    `;
    return;
  }

  // проверка цифры
  if (num === randomNum) {
    document.body.innerHTML = `
    <h2>Поздравляю!<br><br>
    Это  ${num}<h2>
    <button class="play-again" id="play-again">Сыграем ещё?</button>
    `;
  } else if (num > randomNum) {
    msgElement.innerHTML += `
    <div>МЕНЬШЕ</div>
    `;
  } else {
    msgElement.innerHTML += `
    <div>БОЛЬШЕ</div>
    `;
  }
}

// Идёт запись ..
function onSpeak(event) {
  const msg = event.results[0][0].transcript;

  writeMessage(msg);
  chechNumber(msg);
}

// результат записи
raspoznaty.addEventListener('result', onSpeak);

// Событие end

raspoznaty.addEventListener('end', () => raspoznaty.start());

// click => повтор игры
document.body.addEventListener('click', (event) => {
  if (!event.target.id === 'play-again') return;
  window.location.reload();
});
