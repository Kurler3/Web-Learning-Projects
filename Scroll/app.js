const navBar = document.querySelector('.nav-bar');


window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;

  if(scrollHeight > navHeight){
    navBar.classList.add('nav-absolute');
  }else{
    navBar.classList.remove('nav-absolute');
  }
});

const scrollLinks = document.querySelectorAll('.nav-item-link');

scrollLinks.forEach( (link) => {
  link.addEventListener('click', (e) => {
    // Prevents the css smooth scroll
    e.preventDefault();

    // Navigate to specific spot 
    const id = e.currentTarget.getAttribute('href');

    console.log(id);

    const elementToScroll = document.querySelector(id);

    let position = elementToScroll.offsetTop;

    const navHeight = navBar.getBoundingClientRect().height;

    if(id!='#home'){
      position -= navHeight;
    }
    // Need to pass an object here
    window.scrollTo({
      left:0,
      top:position
    });

  });
});