function initTimer() {
    let target_date = new Date(easter()).getTime();

    let days, hours, minutes, seconds;

    const d = document.querySelector('#day');
    const m = document.querySelector('#min');
    const h = document.querySelector('#hour');
    const s = document.querySelector('#sec');

    setInterval(function () {
      // find the amount of "seconds" between now and target
      let current_date = new Date().getTime();
      let seconds_left = (target_date - current_date) / 1000;

      // do some time calculations
      days = parseInt(seconds_left / 86400);
      seconds_left = seconds_left % 86400;

      hours = parseInt(seconds_left / 3600);
      seconds_left = seconds_left % 3600;

      minutes = parseInt(seconds_left / 60);
      seconds = parseInt(seconds_left % 60);

      // display result
      d.textContent = days;
      h.textContent = hours;
      m.textContent = minutes;
      s.textContent = seconds;
    }, 1000);
  }


function easter(x = 0) {
  let date = new Date();
  let years = date.getFullYear() + x;
  let month, day;
  let a = years % 19,
    b = years % 4,
    c = years % 7,
    d = (19 * a + 15) % 30,
    e = (2 * b + 4 * c + 6 * d + 6) % 7,
    f = d + e;
  if (f <= 26) {
    month = 3;
    day = f + 4;
  } else {
    month = 4;
    day = f - 26;
  }
  let easterDate = new Date(years, month, day);
  if (easterDate.getTime() < date.getTime()) {
    return easter(1);
  }
  return easterDate;
}
initTimer();
let easter_date = new Date(easter()),
  dayEvent = easter_date.getDate(),
  monthEvent = easter_date.getMonth().toLocaleString('ru-RU');
let dayEaster = document.querySelector('#event_day');
let monthEaster = document.querySelector('#event_month');
dayEaster.innerHTML = dayEvent;
monthEaster.innerHTML = monthEvent == 4 ? 'мая' : 'апреля';
