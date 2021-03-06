const menu_btn = document.querySelector("#menu-btn");

const close_btn = document.querySelector("#close-btn");

const sidenav_bar = document.querySelector("#sidebar-nav");

menu_btn.addEventListener("click", (e) => {
  sidenav_bar.style.right = "0";
  
  menu_btn.style.display = "none";

  close_btn.style.display = "block";
});

close_btn.addEventListener("click", (e) =>{
  sidenav_bar.style.right = "-250px";
  close_btn.style.display = "none";
  menu_btn.style.display = "block";
});


window.addEventListener("resize", (e) =>{
  
  if(getWidth() > 500){
    menu_btn.style.display = "none";
    close_btn.style.display = "none";
    sidenav_bar.style.right = "-250px";
  }else if(getWidth() <= 500){
    menu_btn.style.display = "block";
    console.log(getWidth());
  }
});

function getWidth() {
  if (self.innerWidth) {
    return self.innerWidth;
  }

  if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
  }

  if (document.body) {
    return document.body.clientWidth;
  }
}

