import fetchJsonp from 'fetch-jsonp';

const petForm = document.getElementById('pet-form');

petForm.addEventListener('submit', fetchAnimals);

// Fetch Animals From API

function fetchAnimals(e){
  e.preventDefault();

  // Get user input
  const animal = document.querySelector('#animal').value;
  const zip = document.querySelector('#zip').value;

  // Fetch Pets

  fetchJsonp(`http://api.petfinder.com/v2/animals?key=dqPCbHu221QesbRXdcm7mXQNESEbmtQhKogSa5GhtC3AGW1iNQ&type=${animal}&location=${zip}&callback=callback`)
  .then(res => res.json)
  .then(data => console.log(data));


}