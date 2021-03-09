import reddit from './redditapi';

const { sort } = require("semver");

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the search term
  const searchTerm = searchInput.value;
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById('limit')
  .value;

  // Check input

  if(searchTerm === ''){
    // Show a message
    showMessage('Please add a search term', 'alert-danger');
  }

  // Clear the Input
  searchInput.value = '';

  // Search Reddit (it returns a promise to use .then)
  reddit.search(searchTerm, sortBy, searchLimit)
  .then(results => {
    let output = '<div class="card-columns">';
    console.log(results);
    
    // Loop through the posts
    results.forEach( (post) => {
      // Check for image
      const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';

      output += `
        <div class="card" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${post.url}" target="_blank" class="btn btn-primary">Check This Post</a>
        </div>
      </div>
      `;
    });

    output += '</div>';

    document.getElementById('results').innerHTML = output;
  });
});

// Show Message Function
function showMessage(message, className){
  // Create a div
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  // Add the text
  div.appendChild(document.createTextNode(message));
  // Get the parent container
  const parentDiv = document.getElementById('search-container');
  // Get the search 
  const search = document.getElementById('search');
  // Insert the message
  parentDiv.insertBefore(div, search);

  // Set a timeout 
  setTimeout( () => div.remove(), 3000);
}

// Truncate Text

function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if(shortened == -1) return text;
  return text.substring(0, shortened);
}