const mobileMenuBtn = document.querySelector('#nav-menu-btn');

const mobileMenuContainer = document.querySelector('.mobile-menu-container');

const main = document.querySelector('main');

const footer = document.querySelector('footer');

let isMobileMenuOpen = false;

mobileMenuBtn.addEventListener('click', e => {
  // If the menu is open then we have to close it, change the icon and display main and footer again. 
  if(isMobileMenuOpen){
// Change the btn to a cross
    mobileMenuBtn.classList.remove('fa-times');
    mobileMenuBtn.classList.add('fa-bars');

    // Make the container appear
    mobileMenuContainer.style.display = 'none';

    // Make main and footer disappear
    main.style.display = 'block';
    footer.style.display = 'flex';

    // Update the isOpen variable
    isMobileMenuOpen = false;
  
  // If the menu is closed, then we want to open it, change the icon and change the display of main and footer to none.
  }else {
    // Change the btn to a cross
    mobileMenuBtn.classList.remove('fa-bars');
    mobileMenuBtn.classList.add('fa-times');

    // Make the container appear
    mobileMenuContainer.style.display = 'block';
  
    // Make main and footer disappear
    main.style.display = 'none';
    footer.style.display = 'none';

    // Update the isOpen variable
    isMobileMenuOpen = true;
  }
})