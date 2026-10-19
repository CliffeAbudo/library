const myLibrary = [];
const libraryContainer = document.querySelector("#library-container");
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  /**
   *   this.info = function () {
    let readingStatus;

    if (this.read) {
      readingStatus = "already read";
    } else {
      readingStatus = "not read yet";
    }

    return `${this.title} by ${this.author}, ${this.pages} pages, ${readingStatus}`;
  };
   */
}
function addbooktolibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  libraryContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    read.textContent = book.read ? "Read" : "Not read yet"; //ternary operator to make it more user friendly
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    libraryContainer.appendChild(bookCard);
  });
}

addbooktolibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addbooktolibrary("Dune", "Frank Herbert", 412, true);

console.log(myLibrary);

displayBooks();
