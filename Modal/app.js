const container = document.querySelector('.container');

const openModalBtn = document.querySelector('.btn');

const modal = document.querySelector('.modal');

const closeModalBtn = document.querySelector('#close-btn');

openModalBtn.addEventListener('click', (e) => {
  // Make a blue color appear in the background
  container.style.background = 'linear-gradient(0deg, rgba(rgb(135,206,250), rgb(135,206,250)), url(./background.jpg)';
  //Show modal
  modal.style.display = "block";
});

closeModalBtn.addEventListener('click', (e) => {
  container.style.background = 'url(./background.jpg)';
  modal.style.display = 'none';
});

