const myLibrary = [];
const addBtn = document.getElementById('addBtn');
const closeBookModalBtn = document.getElementById('new-book-modal-close');
const cards = document.getElementById('cards');

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

function displayBook(title, author, year, edition, publisher, pages) {
  const card = document.createElement('div');
  card.classList.add('card');
  const cardText = document.createElement('div');
  cardText.classList.add('card-text');
  card.appendChild(cardText);
  const bookTitle = document.createElement('p');
  bookTitle.textContent = `${title}`;
  cardText.appendChild(bookTitle);
  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = `Written by ${author}`;
  cardText.appendChild(bookAuthor);
  const bookYear = document.createElement('p');
  bookYear.textContent = `Published in ${year}`;
  cardText.appendChild(bookYear);
  const bookEdition = document.createElement('p');
  bookEdition.textContent = `${edition} edition`;
  cardText.appendChild(bookEdition);
  const bookPublisher = document.createElement('p');
  bookPublisher.textContent = `Publisher: ${publisher}`;
  cardText.appendChild(bookPublisher);
  const bookPages = document.createElement('p');
  bookPages.textContent = `Number of pages: ${pages}`;
  cardText.appendChild(bookPages);
  const bookCite = document.createElement('p');
  bookCite.textContent = `Citation (APA7):`;
  cardText.appendChild(bookCite);
  const bookCitationTitle = document.createElement('em');
  bookCitationTitle.textContent = `${title}`;
  const bookCitation = document.createElement('p');
  bookCitation.textContent = `${author}. (${year}). `;
  bookCitation.appendChild(bookCitationTitle);
  const bookCitationRest = document.createTextNode(
    `. (${edition} Ed.). ${publisher}.`
  );
  bookCitation.appendChild(bookCitationRest);
  cardText.appendChild(bookCitation);
  const cardButtons = document.createElement('div');
  cardButtons.classList.add('card-buttons');
  card.appendChild(cardButtons);
  const cardReadButton = document.createElement('button');
  cardReadButton.classList.add('card-readBtn');
  if (this.read) {
    cardReadButton.classList.add('status-read');
    cardReadButton.textContent = 'Read';
  } else {
    cardReadButton.classList.add('status-unread');
    cardReadButton.textContent = 'Unread';
  }
  cardButtons.appendChild(cardReadButton);
  const cardButtonsDiv = document.createElement('div');
  cardButtons.appendChild(cardButtonsDiv);
  const editBtn = document.createElement('button');
  editBtn.classList.add('card-editBtn');
  cardButtonsDiv.appendChild(editBtn);
  const editImg = document.createElement('img');
  editImg.setAttribute('src', './images/edit.svg');
  editImg.setAttribute('alt', 'edit');
  editBtn.appendChild(editImg);
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('card-deleteBtn');
  cardButtonsDiv.appendChild(deleteBtn);
  const deleteImg = document.createElement('img');
  deleteImg.setAttribute('src', './images/delete.svg');
  deleteImg.setAttribute('alt', 'delete');
  deleteBtn.appendChild(deleteImg);
  cards.appendChild(card);
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
    /* Display all books function - change place */
    myLibrary.forEach((book) =>
      displayBook(
        book.title,
        book.author,
        book.year,
        book.edition,
        book.publisher,
        book.pages
      )
    );
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
