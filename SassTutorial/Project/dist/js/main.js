const menuBtn = document.querySelector('.menu-btn');
const menuBurguer = document.querySelector('.menu-btn-burguer');

const nav = document.querySelector('.nav');
const navList = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.menu-nav-item');

let showMenu = false;

menuBtn.addEventListener('click', toogleMenu);

function toogleMenu(e) {
  // If the menu is not open then open it
  if(!showMenu){

    menuBurguer.classList.add('open');
    nav.classList.add('open');
    navList.classList.add('open');
    navItems.forEach((item) => item.classList.add('open'));

    showMenu = true;
  }else{

    menuBurguer.classList.remove('open');
    nav.classList.remove('open');
    navList.classList.remove('open');
    navItems.forEach(item => item.classList.remove('open'));

    showMenu = false;
  }
}