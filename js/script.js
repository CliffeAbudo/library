const myLibrary = [];

const libraryContainer = document.querySelector("#library-container");
const newBookBtn = document.querySelector("#new-book-btn");
const bookForm = document.querySelector("#book-form");
const cancelFormBtn = document.querySelector("#cancel-form-btn");

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addbooktolibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("article");
    bookCard.classList.add("book-card");

    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");

    const removeButton = document.createElement("button");
    const toggleButton = document.createElement("button");

    title.textContent = book.title;
    author.textContent = `by ${book.author}`;
    pages.textContent = `${book.pages} pages`;

    read.textContent = book.read ? "Read" : "Not read yet";

    removeButton.textContent = "Remove book";

    toggleButton.textContent = book.read ? "Mark as unread" : "Mark as read";

    removeButton.addEventListener("click", () => {
      const index = myLibrary.findIndex((someBook) => someBook.id === book.id);

      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
      }
    });

    toggleButton.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    bookCard.append(title, author, pages, read, toggleButton, removeButton);

    libraryContainer.appendChild(bookCard);
  });
}

newBookBtn.addEventListener("click", () => {
  bookForm.hidden = false;
  document.querySelector("#title").focus();
});

cancelFormBtn.addEventListener("click", () => {
  bookForm.reset();
  bookForm.hidden = true;
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = bookForm.querySelector("#title").value.trim();
  const author = bookForm.querySelector("#author").value.trim();
  const pages = Number(bookForm.querySelector("#pages").value);
  const read = bookForm.querySelector("#read").checked;

  if (!title || !author || !Number.isFinite(pages) || pages < 1) {
    return;
  }

  addbooktolibrary(title, author, pages, read);

  displayBooks();

  bookForm.reset();
  bookForm.hidden = true;
});

addbooktolibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addbooktolibrary("Dune", "Frank Herbert", 412, true);

displayBooks();
