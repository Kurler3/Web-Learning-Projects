const permanentListItemContent = document.querySelector('.item-permanent');

const list = document.querySelector('.list');

const p = document.querySelectorAll('.list .list-item p');

const listItems = list.children;

list.addEventListener('click', (e) => {
  const isBtn = e.target.classList.contains('btn');
  
  if(isBtn){

    const numItem = e.target.classList[0];

    for(let i=0;i<p.length;i++){

      if(p[i].id == numItem){
        // If its closed and was clicked then open
        if(p[i].style.display == 'none'){
          p[i].style.display = 'inline-block';
        // If was open and was clicked then close  
        }else{
          p[i].style.display = 'none';
        }
      // Close any other that wasn't clicked  
      }else{
        p[i].style.display = 'none';
      }
    }
  }
});