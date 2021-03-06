// Book Class : Represents a book

class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI{
  static displayBooks(){
    Store.getBooks().forEach((book) => UI.addBookToList(book));
  }
  // Creates a row to put into the tbody
  static addBookToList(book){
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>
        <a href="#" class="btn btn-danger btn-sm delete">X</a>
      </td>
    `;

    list.appendChild(row);
  }

  // Deletes book from list 
  static deleteBook(target){
    // Get the targets parents parent (whole row) and remove it
    target.parentElement.parentElement.remove();
  }

  // Show alert (className for styling)
  static showAlert(message, className){
    // Creating the alert
    const div = document.createElement('div');

    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));

    // Inserting it in the DOM
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');

    // Inserts the alert between the logo and the form
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  // Resets the fields in the form
  static clearFields(){
    document.querySelector('#book-form').reset();
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    } else{
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }
  
  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach( (book, index) => {
      if(book.isbn === isbn){
        // Splice method takes in a starter index to start removing at and how many elements to remove after that index
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks());

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //Prevent default submit action
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;

    const author = document.querySelector('#author').value;

    const isbn = document.querySelector('#isbn').value;

    // Check the input
    if(title!=='' && author!=='' && isbn!==''){
      // Instantiate the book
      const book = new Book(title, author, isbn);
      // Add to UI
      UI.addBookToList(book);

      // Add it to local storage
      Store.addBook(book);

      // Show success message
      UI.showAlert('Book Added', 'success');
      // Reset the fields in the form
      UI.clearFields();
    }else{
      UI.showAlert('Please fill in all fields', 'danger');
    }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Filter for clicks on the button by its class
  if(e.target.classList.contains('delete')){
    // Delete the book from the list
    UI.deleteBook(e.target);

    // Update local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    // Show message
    UI.showAlert('Book Removed', 'success');
  }
})