// jose-g315
// logic and DOM manipulation for library app

// array to hold book objects
const myLibrary = [];

// book constructor
function Book(title, author, pageNumber, genre, readStatus) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.genre = genre;
  this.readStatus = readStatus;
}
// function to add books using the constructor
function addBookToLibrary(title, author, pageNumber, genre, readStatus) {
  const book = new Book(title, author, pageNumber, genre, readStatus);
  myLibrary.push(book);
}

// function to display modal dialog
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector(".add-book")
  addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

// function to destroy cards, add book from form data and display new cards
const addForm = document.querySelector(".add-form");
addForm.addEventListener("click", () => {
  // destroying previous cards 
  myLibrary.forEach(book => {
    const bookCard = document.querySelector('.book-card');
    bookCard.remove();
  });
  // adding form input to book array
  addBookToLibrary(document.querySelector("#title").value, document.querySelector("#author").value, document.querySelector("#pages").value, document.querySelector("#genre").value, document.querySelector('input[name="read-status"]:checked').value);
  // closing dialog and calling displayBooks() with new book cards
  dialog.close();
  displayBooks();
  // resetting form
  document.querySelector(".book-form").reset();
});

// closing dialog
const closeButton = document.querySelector(".close-button")
closeButton.addEventListener("click", () => {
  dialog.close();
  // resetting form
  document.querySelector(".book-form").reset();
});

function displayBooks(){
  const bookShelf = document.querySelector(".bookshelf");
  //const bookShelf = document.querySelector(".bookshelf");
    myLibrary.forEach(book => {
      // creating a card for every book in the array
      const bookCard = document.createElement('div');
      bookCard.classList.add("book-card");

      /* creating an element and inputting corresponding book 
         value then adding class and appending to the card */
      const title = document.createElement('p');
      title.textContent = book.title;
      title.classList.add("title");
      bookCard.appendChild(title);

      const author = document.createElement('p');
      author.textContent = book.author;
      author.classList.add("author");
      bookCard.appendChild(author);

      const pageNumber = document.createElement('p');
      pageNumber.textContent = book.pageNumber;
      pageNumber.classList.add("page-number");
      bookCard.appendChild(pageNumber);

      const genre = document.createElement("p");
      genre.textContent = book.genre;
      genre.classList.add("genre");
      bookCard.appendChild(genre);

      const readStatus = document.createElement('div');
      readStatus.textContent = book.readStatus;
      readStatus.classList.add("read-status");
      bookCard.appendChild(readStatus);
      
      const deleteButton = document.createElement('div');
      deleteButton.classList.add("delete-button");
      bookCard.appendChild(deleteButton);

      // adding each card to the shelf
      bookShelf.append(bookCard);
    });
}
addBookToLibrary("Eva is a Goose", "Daniel Gonzalez", "300", "Adventure", "Read");
addBookToLibrary("Eva is a Goose", "Daniel Gonzalez", "300", "Adventure", "Read");
displayBooks();
