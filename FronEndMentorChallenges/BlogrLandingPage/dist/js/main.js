const mobileMenuBtn = document.querySelector('#nav-menu-btn');

const mobileMenuContainer = document.querySelector('.mobile-menu-container');


const mobileNavMenuItems = document.querySelectorAll('.mobile-menu-item');



const main = document.querySelector('main');

const footer = document.querySelector('footer');



let isMobileMenuOpen = false;

let currentMobileNavMenuOpenID;

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

mobileNavMenuItems.forEach((item) => {
  item.addEventListener('click', (e) => {

    // Close the extra if clicked on the same and it was open
    if(item.id==currentMobileNavMenuOpenID) {
      item.childNodes[3].style.display = 'none';

      item.children[0].style.color = 'hsl(208, 49%, 24%)';
      item.children[0].children[1].classList.remove('fa-chevron-up');
      item.children[0].children[1].classList.add('fa-chevron-down');
      
      currentMobileNavMenuOpenID = null;
    }else{
      // Close the current item open and open this one
      if(currentMobileNavMenuOpenID!=null){

        mobileNavMenuItems.forEach((itemLoop) => {
          if(itemLoop.id == currentMobileNavMenuOpenID) {
            itemLoop.childNodes[3].style.display = 'none';

            item.children[0].style.color = 'hsl(208, 49%, 24%)';
            item.children[0].children[1].classList.remove('fa-chevron-up');
            item.children[0].children[1].classList.add('fa-chevron-down');
          }
        })
      }
      
      currentMobileNavMenuOpenID = item.id;

      item.childNodes[3].style.display = 'block';

      item.children[0].style.color = 'grey';
      item.children[0].children[1].classList.add('fa-chevron-up');
      item.children[0].children[1].classList.remove('fa-chevron-down');
    }
  });
});