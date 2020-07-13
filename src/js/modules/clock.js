const getCurrentTime = () => {
  if (!localStorage.getItem('clock')) {
    localStorage.setItem('clock', JSON.stringify(Date.parse(new Date())));
  }

  return JSON.parse(localStorage.getItem('clock'));
};

/**
 * Считает оставшееся время
 * @param {string} endtime - строковое представление даты
 */
const getTimeRemaining = (endtime) => {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);

  return {
    total,
    minutes,
    seconds,
  };
};

/**
 * Инициализирует таймер
 * @param {string} id - id DOM элемента
 * @param {string} endtime - строковое представление даты
 */
const initializeClock = (id, callback) => {
  const clock = document.getElementById(id);
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  let timeinterval;

  const updateClock = () => {
    const timeInMinutes = 15;
    const currentTime = getCurrentTime();
    const deadline = new Date(currentTime + timeInMinutes * 60 * 1000);

    const t = getTimeRemaining(deadline);
    minutesSpan.innerHTML = `${`0${t.minutes}`.slice(-2)}m `;
    secondsSpan.innerHTML = `${`0${t.seconds}`.slice(-2)}s`;

    if (t.total <= 0) {
      clearInterval(timeinterval);
      callback();
    }
  };

  updateClock();
  timeinterval = setInterval(updateClock, 1000);
};

export default initializeClock;
