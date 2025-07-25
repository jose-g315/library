// jose-g315
// logic and DOM manipulation for library app

const myLibrary = [];

function Book(title, author, pageNumber, genre, readStatus) {
  this.uuid = self.crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.genre = genre;
  this.readStatus = readStatus;
}
function addBookToLibrary(title, author, pageNumber, genre, readStatus) {
  const book = new Book(title, author, pageNumber, genre, readStatus);
  myLibrary.push(book);
}
function rebuildBookShelf(){
  const bookCards = document.querySelectorAll('.book-card');
  for (const bookCard of bookCards) {
    if (bookCard != null){
      bookCard.remove();
    }; 
  }
  displayBooks();
  console.table(myLibrary);
};
function deleteBookFromLibrary(index,card) {
  card.remove();
  myLibrary.splice(index, 1);
  console.log("Removed Index: " + index);
  rebuildBookShelf();
  
}
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
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  // data validation
  if (title.value.length > 0 && author.value.length > 0) {
    addBookToLibrary(title.value, author.value, document.querySelector("#pages").value, document.querySelector("#genre").value, document.querySelector('input[name="read-status"]:checked').value);
    closingAndResetting(); 
    rebuildBookShelf();
  } else {
    alert("Please Enter a Title and Author");
    title.classList.add("invalid");
    author.classList.add("invalid");
  }
});
}

function displayBooks(){
  const bookShelf = document.querySelector(".bookshelf");
    myLibrary.forEach((book,index) => {
      // creating a card for every book in the array
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

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
      deleteButton.classList.add("delete-button");
      bookCard.appendChild(deleteButton);
      deleteButton.addEventListener("click", () => {
        deleteBookFromLibrary(index,bookCard);
      });
      bookShelf.append(bookCard);
    });
}
function initializeApp() {
  addBookToLibrary("Over the Horizon", "Larry Wells", "1205", "Action", "Unread");
  addBookToLibrary("Who I Am", "Tony Rivers", "600", "Mystery", "Read");
  addBookToLibrary("A Knight of the Seven Kingdoms", "Duncan Strong", "850", "Adventure", "Read");
  displayBooks();
  addFormData();
}

initializeApp();

