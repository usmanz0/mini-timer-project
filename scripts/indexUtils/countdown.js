export function countdownTimer() {
  const storedYearsInput = JSON.parse(localStorage.getItem('yearsInput')) || 1;

  if (!localStorage.getItem('endDate')) {
    const now = new Date();
    const endDate = new Date(now);
    endDate.setFullYear(now.getFullYear() + storedYearsInput);
    localStorage.setItem('endDate', endDate.toISOString());
  }

  const endDate = new Date(localStorage.getItem('endDate'));

  function updateCountdown() {
    const now = new Date();
    const diffInSeconds = Math.floor((endDate - now) / 1000);

    if (diffInSeconds <= 0) {
      countdownDays.innerHTML = '00';
      countdownHours.innerHTML = '00';
      countdownMinutes.innerHTML = '00';
      countdownSeconds.innerHTML = '00';
      return;
    }

    const days = Math.floor(diffInSeconds / (3600 * 24));
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    countdownDays.innerHTML = days;
    countdownHours.innerHTML = hours.toString().padStart(2, '0');
    countdownMinutes.innerHTML = minutes.toString().padStart(2, '0');
    countdownSeconds.innerHTML = seconds.toString().padStart(2, '0');
  }
  updateCountdown();
  
  const timerInterval = setInterval(() => {
    updateCountdown();
  }, 1000);
}