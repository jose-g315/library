const myLibrary = [];

function Book(title, author, pageNumber, genre, readStatus) {
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
addBookToLibrary("test", "test1", "test3", "test4", "test5");
addBookToLibrary("test21", "test1321", "test3321", "test4321", "test5321");

function displayBooks(){
    myLibrary.forEach(book => {
        console.log(book);
    });
}
displayBooks();
