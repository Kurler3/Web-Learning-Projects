const mobileMenuBtn = document.querySelector('#nav-menu-btn');

const mobileMenuContainer = document.querySelector('.mobile-menu-container');

const mobileNavMenuItems = document.querySelectorAll('.mobile-menu-item');

const headerContainer = document.querySelector(".header-container");

const main = document.querySelector('main');

const footer = document.querySelector('footer');

const desktopMinWidth = 700;

let isMobileMenuOpen = false;

let currentMobileNavMenuOpenID;

let isDesktopSize = document.body.offsetWidth >= desktopMinWidth;

window.addEventListener('resize', () => {
  isDesktopSize = document.body.offsetWidth >= desktopMinWidth;
  
  // If the it enters desktop size then close the current currentOpenID, 
  //make it null and change the colors of the nav list items to white and
  // make the display of the nav bar flex 
  if(isDesktopSize){
    mobileNavMenuItems.forEach((itemLoop) => {
          if(itemLoop.id == currentMobileNavMenuOpenID) {
            itemLoop.childNodes[3].style.display = 'none';
          }
          changeColorAndIcon(itemLoop, false, isDesktopSize);
        });
    currentMobileNavMenuOpenID = null;

    // If the mobile menu was closed, then have to manually change it.
    mobileMenuContainer.style.display = 'flex';

    if(isMobileMenuOpen){
      mobileMenuBtn.classList.remove('fa-times');
      mobileMenuBtn.classList.add('fa-bars');
    }
    
    isMobileMenuOpen = false;

    headerContainer.style.display = 'block';
  }else {
    // If it enters mobile size then reset the currentOpenID and close it and also make the color of the 
    // list items to grayish blue and change the class of the button to the bars
    mobileNavMenuItems.forEach((itemLoop) => {
          if(itemLoop.id == currentMobileNavMenuOpenID) {
            itemLoop.childNodes[3].style.display = 'none';
          }
          changeColorAndIcon(itemLoop, false, isDesktopSize);
        });
    currentMobileNavMenuOpenID = null;
    mobileMenuContainer.style.display = 'none';
    
    mobileMenuBtn.classList.remove('fa-times');
      mobileMenuBtn.classList.add('fa-bars');

  
    
    isMobileMenuOpen = false;

    
  }
});



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

    // Display the header container
    headerContainer.style.display = 'block';
  
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

    // Hide the header container
    headerContainer.style.display = 'none';
  }
})

mobileNavMenuItems.forEach((item) => {
  item.addEventListener('click', (e) => {

    // Close the extra if clicked on the same and it was open
    if(item.id==currentMobileNavMenuOpenID) {
      item.childNodes[3].style.display = 'none';
      
      changeColorAndIcon(item, false, isDesktopSize);
      
      currentMobileNavMenuOpenID = null;
    }else{
      // Close the current item open and open this one
      if(currentMobileNavMenuOpenID!=null){

        mobileNavMenuItems.forEach((itemLoop) => {
          if(itemLoop.id == currentMobileNavMenuOpenID) {
            itemLoop.childNodes[3].style.display = 'none';
            
            changeColorAndIcon(itemLoop, false, isDesktopSize);
          }
        })
      }
      
      currentMobileNavMenuOpenID = item.id;

      item.childNodes[3].style.display = 'block';

      changeColorAndIcon(item, true, isDesktopSize);
    }
  });
});


function changeColorAndIcon(item, isOpening, isDesktop) {
  if(isDesktop) {
    if(isOpening){
      item.children[0].style.color = 'grey';
      changeIcon(item,'fa-chevron-up', 'fa-chevron-down');
    }else{
      item.children[0].style.color = 'white';
      changeIcon(item,'fa-chevron-down', 'fa-chevron-up');
    }
  }else{
    if(isOpening) {
      item.children[0].style.color = 'grey';
      changeIcon(item,'fa-chevron-up', 'fa-chevron-down');
    }else {
      item.children[0].style.color = 'hsl(208, 49%, 24%)';
      changeIcon(item,'fa-chevron-down', 'fa-chevron-up');
    }
  }
}

function changeIcon(item, classToAdd, classToRemove) {
  item.children[0].children[1].classList.add(classToAdd);
  item.children[0].children[1].classList.remove(classToRemove);
}