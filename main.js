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
//function to destroy old cards and display updated cards
function rebuildBookShelf(){
  myLibrary.forEach(book => {
    const bookCard = document.querySelector('.book-card');
    if (bookCard != null){
      bookCard.remove();
    };  
  });
  displayBooks();
};

// function to add books using the constructor
function addBookToLibrary(title, author, pageNumber, genre, readStatus) {
  const book = new Book(title, author, pageNumber, genre, readStatus);
  myLibrary.push(book);
}

// deleting book object from array and bookCard
function deleteBookFromLibrary(index,card) {
  card.remove();
  myLibrary.splice(index, 1);
  console.log("Removed Index: " + index);
  rebuildBookShelf();
  
}
// toggling read status of each card
function updateReadStatus(index){
  let book = myLibrary[index]
  if (book.readStatus === "Read") {
    book.readStatus = "Unread";
    console.log(book.readStatus);
    rebuildBookShelf();
  }
  else {
    book.readStatus = "Read";
    console.log(book.readStatus);
    rebuildBookShelf()
  }
}
const dialog = document.querySelector("dialog");

const addBookButton = document.querySelector(".add-book")
  addBookButton.addEventListener("click", () => {
  // displaying modal dialog
  dialog.showModal();
});
 
const closeButton = document.querySelector(".close-button")
closeButton.addEventListener("click", () => {
  closingAndResetting();
});
function closingAndResetting(){
  // closing modal dialog
  dialog.close()
  // resetting form
  document.querySelector(".book-form").reset();
}

// function to destroy cards, add book from form data and display new cards
function addFormData() {
  const addForm = document.querySelector(".add-form");
  addForm.addEventListener("click", () => {
  // adding form input to book array
  addBookToLibrary(document.querySelector("#title").value, document.querySelector("#author").value, document.querySelector("#pages").value, document.querySelector("#genre").value, document.querySelector('input[name="read-status"]:checked').value);
  closingAndResetting(); 
  rebuildBookShelf();
  
});
}

function displayBooks(){
  const bookShelf = document.querySelector(".bookshelf");
  //const bookShelf = document.querySelector(".bookshelf");
    myLibrary.forEach((book,index) => {
      // creating a card for every book in the array
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      /* creating an element and inputting corresponding book 
         value then adding class and appending to the card */
      const title = document.createElement("p");
      title.textContent = book.title;
      title.classList.add("title");
      bookCard.appendChild(title);

      const author = document.createElement("p");
      author.textContent = book.author;
      author.classList.add("author");
      bookCard.appendChild(author);

      const pageNumber = document.createElement("p");
      pageNumber.textContent = book.pageNumber;
      pageNumber.classList.add("page-number");
      bookCard.appendChild(pageNumber);

      const genre = document.createElement("p");
      genre.textContent = book.genre;
      genre.classList.add("genre");
      bookCard.appendChild(genre);

      const readStatus = document.createElement("button");
      readStatus.textContent = book.readStatus;
      readStatus.classList.add("read-status");
      if(readStatus.textContent === "Unread") {
        readStatus.classList.add("unread");
      }
      bookCard.appendChild(readStatus);
      readStatus.addEventListener("click", () => {
          updateReadStatus(index);
      });
      
      
      const deleteButton = document.createElement("button");
      //deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      bookCard.appendChild(deleteButton);
      deleteButton.addEventListener("click", () => {
        // calling function to delete object from array and bookCard
        deleteBookFromLibrary(index,bookCard);
      });

      // adding each card to the shelf
      bookShelf.append(bookCard);
    });
}

addBookToLibrary("Over the Horizon", "Larry Wells", "1205", "Action", "Unread");
addBookToLibrary("Who I Am", "Tony Rivers", "600", "Mystery", "Read");
addBookToLibrary("A Knight of the Seven Kingdoms", "Duncan Strong", "850", "Adventure", "Read");
displayBooks();
addFormData();

