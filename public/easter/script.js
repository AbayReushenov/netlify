function easter(x = 0) {
  const date = new Date();
  const years = date.getFullYear() + x;
  let month;
  let day;
  const a = years % 19;
  const b = years % 4;
  const c = years % 7;
  const d = (19 * a + 15) % 30;
  const e = (2 * b + 4 * c + 6 * d + 6) % 7;
  const f = d + e;
  if (f <= 26) {
    month = 3;
    day = f + 4;
  } else {
    month = 4;
    day = f - 26;
  }
  const easterDate = new Date(years, month, day);
  if (easterDate.getTime() < date.getTime()) {
    return easter(1);
  }
  return easterDate;
}
/* eslint-disable radix */
/* eslint-disable camelcase */
function initTimer() {
  const target_date = new Date(easter()).getTime();

  let days;
  let hours;
  let minutes;
  let seconds;

  const d = document.querySelector('#day');
  const m = document.querySelector('#min');
  const h = document.querySelector('#hour');
  const s = document.querySelector('#sec');

  setInterval(() => {
    // find the amount of "seconds" between now and target
    const current_date = new Date().getTime();
    let seconds_left = (target_date - current_date) / 1000;

    // do some time calculations
    days = parseInt(seconds_left / 86400);
    seconds_left %= 86400;

    hours = parseInt(seconds_left / 3600);
    seconds_left %= 3600;

    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);

    // display result
    d.textContent = days;
    h.textContent = hours;
    m.textContent = minutes;
    s.textContent = seconds;
  }, 1000);
}

const easter_date = new Date(easter());
const dayEvent = easter_date.getDate();
const yearEvent = easter_date.getFullYear();
const dayEaster = document.querySelector('#event_day');
dayEaster.innerHTML = `${dayEvent} ${String(
  easter_date.toLocaleString('default', {
    month: 'long',
  }),
).replace(/.$/, 'я')}  ${yearEvent} года`;

initTimer();
