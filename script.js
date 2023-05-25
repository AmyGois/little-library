const myLibrary = [];
const addBtn = document.getElementById('addBtn');

/* Book object constructor and prototype */
function Book(title, author, year, edition, publisher, pages, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.edition = edition;
  this.publisher = publisher;
  this.pages = pages;
  this.read = read;
}

Book.prototype.sortName = function () {
  const splitName = this.author.split(' ');
  const lastName = splitName[splitName.length - 1];
  let otherNames = '';
  let sortedName = '';
  if (splitName.length > 1) {
    for (i = 0; i < splitName.length - 1; i++) {
      otherNames += ` ${splitName[i].substr(0, 1)}.`;
    }
  }
  if (otherNames) {
    sortedName = `${lastName},${otherNames}`;
  } else {
    sortedName = lastName;
  }
  return sortedName;
};

Book.prototype.sortEdition = function () {
  const lastNumber = this.edition.substr(-1, 1);
  let sortedEdition = '';
  if (this.edition === '11' || this.edition === '12' || this.edition === '13') {
    sortedEdition = `${this.edition}th`;
  } else {
    switch (lastNumber) {
      case '1':
        sortedEdition = `${this.edition}st`;
        break;
      case '2':
        sortedEdition = `${this.edition}nd`;
        break;
      case '3':
        sortedEdition = `${this.edition}rd`;
        break;
      default:
        sortedEdition = `${this.edition}th`;
    }
  }
  return sortedEdition;
};

function changeReadStatus() {
  if (this.classList.contains('status-read')) {
    this.classList.replace('status-read', 'status-unread');
    this.textContent = 'Unread';
    myLibrary[Number(this.dataset.index)].read = false;
  } else if (this.classList.contains('status-unread')) {
    this.classList.replace('status-unread', 'status-read');
    this.textContent = 'Read';
    myLibrary[Number(this.dataset.index)].read = true;
  } else {
    console.log('error');
  }
}

/* Display book in DOM */
function displayBook(
  title,
  author,
  year,
  sortEdition,
  publisher,
  pages,
  read,
  sortName
) {
  const cards = document.getElementById('cards');
  const card = document.createElement('div');
  card.dataset.index = `${myLibrary.length - 1}`;
  card.classList.add('card');
  const cardText = document.createElement('div');
  cardText.classList.add('card-text');
  card.appendChild(cardText);

  /* Create text elements of card */
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
  bookEdition.textContent = `${sortEdition} edition`;
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
  bookCitation.textContent = `${sortName} (${year}). `;
  bookCitation.appendChild(bookCitationTitle);
  const bookCitationRest = document.createTextNode(
    `. (${sortEdition} Ed.). ${publisher}.`
  );
  bookCitation.appendChild(bookCitationRest);
  cardText.appendChild(bookCitation);

  /* Create buttons for card */
  const cardButtons = document.createElement('div');
  cardButtons.classList.add('card-buttons');
  card.appendChild(cardButtons);
  const cardReadButton = document.createElement('button');
  cardReadButton.classList.add('card-readBtn');
  if (read) {
    cardReadButton.classList.add('status-read');
    cardReadButton.textContent = 'Read';
  } else {
    cardReadButton.classList.add('status-unread');
    cardReadButton.textContent = 'Unread';
  }
  cardReadButton.addEventListener('click', changeReadStatus);
  cardReadButton.dataset.index = `${myLibrary.length - 1}`;
  cardButtons.appendChild(cardReadButton);
  const cardButtonsDiv = document.createElement('div');
  cardButtons.appendChild(cardButtonsDiv);
  const editBtn = document.createElement('button');
  editBtn.classList.add('card-editBtn');
  editBtn.dataset.index = `${myLibrary.length - 1}`;
  cardButtonsDiv.appendChild(editBtn);
  const editImg = document.createElement('img');
  editImg.setAttribute('src', './images/edit.svg');
  editImg.setAttribute('alt', 'edit');
  editBtn.appendChild(editImg);
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('card-deleteBtn');
  deleteBtn.dataset.index = `${myLibrary.length - 1}`;
  cardButtonsDiv.appendChild(deleteBtn);
  const deleteImg = document.createElement('img');
  deleteImg.setAttribute('src', './images/delete.svg');
  deleteImg.setAttribute('alt', 'delete');
  deleteBtn.appendChild(deleteImg);
  cards.appendChild(card);
}

/* Add a new Book to the myLibrary array from user input */
function addBookToLibrary(event) {
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
    /* Display all books function - change place
    myLibrary.forEach((book) =>
      displayBook(
        book.title,
        book.author,
        book.year,
        book.sortEdition(),
        book.publisher,
        book.pages,
        book.read,
        book.sortName()
      )
    ); */
  }
}

/* General functions for opening and closing modals */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('modal-inactive');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('modal-inactive');
}

/* Add a new book to myLibrary array and to the DOM when the form is submitted, and close modal */
function addNewBook() {
  addBookToLibrary(event);
  const newBook = myLibrary[myLibrary.length - 1];
  displayBook(
    newBook.title,
    newBook.author,
    newBook.year,
    newBook.sortEdition(),
    newBook.publisher,
    newBook.pages,
    newBook.read,
    newBook.sortName()
  );
  closeModal('new-book-modal');
}

/* Function to open New Book modal */
function openNewBookModal(modalId) {
  openModal(modalId);

  const closeBookModalBtn = document.getElementById('new-book-modal-close');
  closeBookModalBtn.addEventListener('click', () =>
    closeModal('new-book-modal')
  );
  const formSubmitBtn = document.getElementById('form-submit');
  formSubmitBtn.addEventListener('click', addNewBook);
}

addBtn.addEventListener('click', () => openNewBookModal('new-book-modal'));
