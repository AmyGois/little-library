const myLibrary = [];
const addBtn = document.getElementById('addBtn');
const closeBookModalBtn = document.getElementById('new-book-modal-close');

/* Book object constructor */
function Book(title, author, year, edition, publisher, pages, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.edition = edition;
  this.publisher = publisher;
  this.pages = pages;
  this.read = read;
}

/* Add a new Book to the myLibrary array */
function addBookToLibrary(event) {
  // Add new book to array from user input
  const newBookTitle = document.getElementById('new-book-title').value;
  const newBookAuthor = document.getElementById('new-book-author').value;
  const newBookYear = document.getElementById('new-book-year').value;
  const newBookEdition = document.getElementById('new-book-edition').value;
  const newBookPublisher = document.getElementById('new-book-publisher').value;
  const newBookPages = document.getElementById('new-book-pages').value;
  const newBookRead = document.getElementById('new-book-read').checked;

  if (
    newBookTitle !== '' &&
    newBookAuthor !== '' &&
    newBookYear !== '' &&
    newBookEdition !== '' &&
    newBookPublisher !== ''
  ) {
    event.preventDefault();

    const newBook = new Book(
      newBookTitle,
      newBookAuthor,
      newBookYear,
      newBookEdition,
      newBookPublisher,
      newBookPages,
      newBookRead
    );
    myLibrary.push(newBook);
    console.log(myLibrary);
  }
}

/* Functions for opening and closing modals */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('modal-inactive');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('modal-inactive');
}

function openNewBookModal(modalId) {
  openModal(modalId);

  const formSubmitBtn = document.getElementById('form-submit');
  formSubmitBtn.addEventListener('click', addBookToLibrary);
}

addBtn.addEventListener('click', () => openNewBookModal('new-book-modal'));
closeBookModalBtn.addEventListener('click', () => closeModal('new-book-modal'));
