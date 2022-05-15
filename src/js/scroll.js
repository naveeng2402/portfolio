const nav = document.getElementById('navbar-wrapper');
const nav_links = document.getElementsByClassName('nav-link');

document.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.remove('navbar-transparent');
  } else {
    nav.classList.add('navbar-transparent');
  }
});

const link_click = (btn) => {
  console.log(btn.innerHTML);
  Array.from(nav_links).forEach((nav_link) => {
    nav_link.classList.remove('nav-link-active');
  });
  btn.classList.add('nav-link-active');
};
