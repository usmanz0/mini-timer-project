export function checkDarkMode() {
  if (localStorage.getItem('isDarkModeToggled') === 'true') {
    document.body.classList.add('dark-mode');
    ['p', 'strong', 'small' , 'h1', '.content-heading', '.main-heading'].forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('dark-mode'));
    });

  } else {
    document.body.classList.remove('dark-mode');
    ['p', 'strong', 'small' , 'h1', '.main-heading'].forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.remove('dark-mode'));
    });
  }
}