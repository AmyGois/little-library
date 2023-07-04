/* Contents:
  0. Global variables
  1. Book object constructor and prototype
  2. Example book
  3. Change the 'read' status of the book when the 'read/unread' button is clicked
  4. Display book in DOM
    4.1. Create text elements of card
    4.2. Create buttons for card
  5. Add a new Book to the myLibrary array from user input
  6. General functions for opening and closing modals
  7. Function to open New Book modal
  8. Edit book in library
    8.1. Edit the corresponding book card in the DOM
  9. Function to open Edit Book modal
  10. Delete a book from the library
  11. Display all books function
  12. Sort books by title, author, year, etc. */

/* 0. Global variables */
const myLibrary = [];
const addBtn = document.getElementById('addBtn');
const orderedBooks = document.getElementById('ordered-books');

/* 1. Book object constructor and prototype */
class Book {
  constructor(title, author, year, edition, publisher, pages, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.edition = edition;
    this.publisher = publisher;
    this.pages = pages;
    this.read = read;
  }

  sortName() {
    const splitName = this.author.split(' ');
    const lastName = splitName[splitName.length - 1];
    let otherNames = '';
    let sortedName = '';
    if (splitName.length > 1) {
      for (let i = 0; i < splitName.length - 1; i++) {
        otherNames += ` ${splitName[i].substr(0, 1)}.`;
      }
    }
    if (otherNames) {
      sortedName = `${lastName},${otherNames}`;
    } else {
      sortedName = lastName;
    }
    return sortedName;
  }

  sortEdition() {
    const lastNumber = this.edition.substr(-1, 1);
    let sortedEdition = '';
    if (
      this.edition === '11' ||
      this.edition === '12' ||
      this.edition === '13'
    ) {
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
  }
}
/* function Book(title, author, year, edition, publisher, pages, read) {
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
}; */

/* 2. Example book */
const exampleBook = new Book(
  'Pride and Prejudice',
  'Jane Austen',
  '1813',
  '1',
  'Penguin',
  '303',
  true
);

myLibrary.push(exampleBook);

/* 3. Change the 'read' status of the book when the 'read/unread' button is clicked */
function changeReadStatus() {
  if (this.classList.contains('status-read')) {
    this.classList.replace('status-read', 'status-unread');
    this.textContent = 'Unread';
    myLibrary[Number(this.dataset.index)].read = false;
  } else if (this.classList.contains('status-unread')) {
    this.classList.replace('status-unread', 'status-read');
    this.textContent = 'Read';
    myLibrary[Number(this.dataset.index)].read = true;
  }
}

/* 4. Display book in DOM */
function displayBook(
  arrayIndexOf,
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
  card.dataset.index = `${arrayIndexOf}`;
  card.classList.add('card');
  const cardText = document.createElement('div');
  cardText.classList.add('card-text');
  card.appendChild(cardText);

  /* 4.1. Create text elements of card */
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
  bookCitationTitle.textContent = `${title}. `;
  const bookCitation = document.createElement('p');
  bookCitation.textContent = `${sortName} (${year}). `;
  bookCitation.appendChild(bookCitationTitle);
  const bookCitationRest = document.createTextNode(
    `(${sortEdition} Ed.). ${publisher}.`
  );
  bookCitation.appendChild(bookCitationRest);
  cardText.appendChild(bookCitation);

  /* 4.2. Create buttons for card */
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
  cardReadButton.dataset.index = `${arrayIndexOf}`;
  cardButtons.appendChild(cardReadButton);
  const cardButtonsDiv = document.createElement('div');
  cardButtons.appendChild(cardButtonsDiv);
  const editBtn = document.createElement('button');
  editBtn.classList.add('card-editBtn');
  editBtn.dataset.index = `${arrayIndexOf}`;
  function openEditBookModalFunction() {
    openEditBookModal(editBtn.dataset.index);
  }
  editBtn.addEventListener('click', openEditBookModalFunction);
  cardButtonsDiv.appendChild(editBtn);
  const editImg = document.createElement('img');
  editImg.setAttribute('src', './images/edit.svg');
  editImg.setAttribute('alt', 'edit');
  editBtn.appendChild(editImg);
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('card-deleteBtn');
  deleteBtn.dataset.index = `${arrayIndexOf}`;
  function openConfirmDeleteModalFunction() {
    openConfirmDeleteModal(Number(deleteBtn.dataset.index));
  }
  deleteBtn.addEventListener('click', openConfirmDeleteModalFunction);
  cardButtonsDiv.appendChild(deleteBtn);
  const deleteImg = document.createElement('img');
  deleteImg.setAttribute('src', './images/delete.svg');
  deleteImg.setAttribute('alt', 'delete');
  deleteBtn.appendChild(deleteImg);
  cards.appendChild(card);
}

/* 5. Add a new Book to the myLibrary array from user input */
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

    displayBook(
      myLibrary.indexOf(newBook),
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
}

/* 6. General functions for opening and closing modals */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('modal-inactive');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('modal-inactive');
}

/* 7. Function to open New Book modal */
function openNewBookModal() {
  openModal('new-book-modal');

  const closeBookModalBtn = document.getElementById('new-book-modal-close');
  closeBookModalBtn.addEventListener('click', () =>
    closeModal('new-book-modal')
  );
  const newBookTitle = document.getElementById('new-book-title');
  const newBookAuthor = document.getElementById('new-book-author');
  const newBookYear = document.getElementById('new-book-year');
  const newBookEdition = document.getElementById('new-book-edition');
  const newBookPublisher = document.getElementById('new-book-publisher');
  const newBookPages = document.getElementById('new-book-pages');
  const newBookRead = document.getElementById('new-book-read');
  newBookTitle.value = '';
  newBookAuthor.value = '';
  newBookYear.value = '';
  newBookEdition.value = '';
  newBookPublisher.value = '';
  newBookPages.value = '';
  newBookRead.checked = false;

  const formSubmitBtn = document.getElementById('form-submit');
  formSubmitBtn.addEventListener('click', addBookToLibrary);
}

addBtn.addEventListener('click', openNewBookModal);

/* 8. Edit book in library */
function editBook(indexToEdit, event) {
  const bookTitle = document.getElementById('edit-book-title').value;
  const bookAuthor = document.getElementById('edit-book-author').value;
  const bookYear = document.getElementById('edit-book-year').value;
  const bookEdition = document.getElementById('edit-book-edition').value;
  const bookPublisher = document.getElementById('edit-book-publisher').value;
  const bookPages = document.getElementById('edit-book-pages').value;
  const bookRead = document.getElementById('edit-book-read');

  if (
    bookTitle !== '' &&
    bookAuthor !== '' &&
    bookYear !== '' &&
    bookEdition !== '' &&
    bookPublisher !== ''
  ) {
    event.preventDefault();

    const bookToUpdate = myLibrary[indexToEdit];
    bookToUpdate.title = bookTitle;
    bookToUpdate.author = bookAuthor;
    bookToUpdate.year = bookYear;
    bookToUpdate.edition = bookEdition;
    bookToUpdate.publisher = bookPublisher;
    bookToUpdate.pages = bookPages;
    bookToUpdate.read = bookRead.checked;

    /* 8.1. Edit the corresponding book card in the DOM */
    const cardToUpdate = document.querySelector(
      `[data-index = "${indexToEdit}"]`
    );
    const cardText = cardToUpdate.firstElementChild;
    const titleToUpdate = cardText.firstElementChild;
    const authorToUpdate = titleToUpdate.nextElementSibling;
    const yearToUpdate = authorToUpdate.nextElementSibling;
    const editionToUpdate = yearToUpdate.nextElementSibling;
    const publisherToUpdate = editionToUpdate.nextElementSibling;
    const pagesToUpdate = publisherToUpdate.nextElementSibling;
    const cite = pagesToUpdate.nextElementSibling;
    const citationToUptade = cite.nextElementSibling;
    const citationPart1 = citationToUptade.firstChild;
    const citationPart2 = citationPart1.nextSibling;
    const citationPart3 = citationPart2.nextSibling;
    const cardButtons = cardToUpdate.lastElementChild;
    const readBtnToUpdate = cardButtons.firstElementChild;

    titleToUpdate.textContent = `${bookToUpdate.title}`;
    authorToUpdate.textContent = `Written by ${bookToUpdate.author}`;
    yearToUpdate.textContent = `Published in ${bookToUpdate.year}`;
    editionToUpdate.textContent = `${bookToUpdate.sortEdition()} edition`;
    publisherToUpdate.textContent = `Publisher: ${bookToUpdate.publisher}`;
    pagesToUpdate.textContent = `Number of pages: ${bookToUpdate.pages}`;
    citationPart1.textContent = `${bookToUpdate.sortName()} (${
      bookToUpdate.year
    }). `;
    citationPart2.textContent = `${bookToUpdate.title}. `;
    citationPart3.textContent = `(${bookToUpdate.sortEdition()} Ed.). ${
      bookToUpdate.publisher
    }.`;
    if (bookToUpdate.read) {
      readBtnToUpdate.classList.replace('status-unread', 'status-read');
      readBtnToUpdate.textContent = 'Read';
    } else if (!bookToUpdate.read) {
      readBtnToUpdate.classList.replace('status-read', 'status-unread');
      readBtnToUpdate.textContent = 'Unread';
    }

    closeModal('edit-book-modal');
  }
}

/* 9. Function to open Edit Book modal */
function openEditBookModal(indexToEdit) {
  openModal('edit-book-modal');

  const closeBookModalBtn = document.getElementById('edit-book-modal-close');
  closeBookModalBtn.addEventListener('click', () =>
    closeModal('edit-book-modal')
  );
  const bookToUpdate = myLibrary[indexToEdit];
  const bookTitle = document.getElementById('edit-book-title');
  const bookAuthor = document.getElementById('edit-book-author');
  const bookYear = document.getElementById('edit-book-year');
  const bookEdition = document.getElementById('edit-book-edition');
  const bookPublisher = document.getElementById('edit-book-publisher');
  const bookPages = document.getElementById('edit-book-pages');
  const bookRead = document.getElementById('edit-book-read');
  bookTitle.value = bookToUpdate.title;
  bookAuthor.value = bookToUpdate.author;
  bookYear.value = bookToUpdate.year;
  bookEdition.value = bookToUpdate.edition;
  bookPublisher.value = bookToUpdate.publisher;
  bookPages.value = bookToUpdate.pages;
  bookRead.checked = bookToUpdate.read;
  const editSubmitBtn = document.getElementById('edit-submit');
  function removeListener() {
    editSubmitBtn.removeEventListener('click', editBookFunction);
  }
  function editBookFunction() {
    editBook(indexToEdit, event);
    removeListener();
  }
  editSubmitBtn.addEventListener('click', editBookFunction);
}

/* 10. Delete a book from the library */
function deleteBook(indexToDelete) {
  const deletedBookFromLibrary = myLibrary.splice(Number(indexToDelete), 1);
  const cards = document.getElementById('cards');
  cards.innerHTML = '';
  myLibrary.forEach((book) =>
    displayBook(
      myLibrary.indexOf(book),
      book.title,
      book.author,
      book.year,
      book.sortEdition(),
      book.publisher,
      book.pages,
      book.read,
      book.sortName()
    )
  );
  closeModal('confirm-delete-modal');
}

function openConfirmDeleteModal(indexToDelete) {
  openModal('confirm-delete-modal');

  const confirmDeleteText = document.getElementById('confirm-delete-text');
  const bookName = myLibrary[indexToDelete].title;
  confirmDeleteText.textContent = `Are you sure you want to delete ${bookName} from your library?`;
  const cancelBtn = document.getElementById('cancelBtn');
  cancelBtn.addEventListener('click', () => closeModal('confirm-delete-modal'));
  const deleteBtn = document.getElementById('deleteBtn');
  function removeListener() {
    deleteBtn.addEventListener('click', deleteBookFunction);
  }
  function deleteBookFunction() {
    deleteBook(indexToDelete);
    removeListener();
  }
  deleteBtn.addEventListener('click', deleteBookFunction);
}

/* 11. Display all books function */
myLibrary.forEach((book) =>
  displayBook(
    myLibrary.indexOf(book),
    book.title,
    book.author,
    book.year,
    book.sortEdition(),
    book.publisher,
    book.pages,
    book.read,
    book.sortName()
  )
);

/* 12. Sort books by title, author, year, etc. */

function sortBooks() {
  const cards = document.getElementById('cards');
  cards.innerHTML = '';
  if (orderedBooks.value === 'title') {
    const sortedByTitle = myLibrary.slice().sort((book1, book2) => {
      const title1 = book1.title.toLowerCase();
      const title2 = book2.title.toLowerCase();
      if (title1 < title2) {
        return -1;
      }
      if (title1 > title2) {
        return 1;
      }
      return 0;
    });
    sortedByTitle.forEach((book) =>
      displayBook(
        myLibrary.indexOf(book),
        book.title,
        book.author,
        book.year,
        book.sortEdition(),
        book.publisher,
        book.pages,
        book.read,
        book.sortName()
      )
    );
  } else if (orderedBooks.value === 'author') {
    const sortedByAuthor = myLibrary.slice().sort((book1, book2) => {
      const author1 = book1.author.toLowerCase();
      const author2 = book2.author.toLowerCase();
      if (author1 < author2) {
        return -1;
      }
      if (author1 > author2) {
        return 1;
      }
      return 0;
    });
    sortedByAuthor.forEach((book) =>
      displayBook(
        myLibrary.indexOf(book),
        book.title,
        book.author,
        book.year,
        book.sortEdition(),
        book.publisher,
        book.pages,
        book.read,
        book.sortName()
      )
    );
  } else if (orderedBooks.value === 'year') {
    const sortedByYear = myLibrary.slice().sort((book1, book2) => {
      const year1 = Number(book1.year);
      const year2 = Number(book2.year);
      return year1 - year2;
    });
    sortedByYear.forEach((book) =>
      displayBook(
        myLibrary.indexOf(book),
        book.title,
        book.author,
        book.year,
        book.sortEdition(),
        book.publisher,
        book.pages,
        book.read,
        book.sortName()
      )
    );
  } else if (orderedBooks.value === 'pages') {
    const sortedByPages = myLibrary.slice().sort((book1, book2) => {
      const pages1 = Number(book1.pages);
      const pages2 = Number(book2.pages);
      return pages1 - pages2;
    });
    sortedByPages.forEach((book) =>
      displayBook(
        myLibrary.indexOf(book),
        book.title,
        book.author,
        book.year,
        book.sortEdition(),
        book.publisher,
        book.pages,
        book.read,
        book.sortName()
      )
    );
  } else {
    myLibrary.forEach((book) =>
      displayBook(
        myLibrary.indexOf(book),
        book.title,
        book.author,
        book.year,
        book.sortEdition(),
        book.publisher,
        book.pages,
        book.read,
        book.sortName()
      )
    );
  }
}

orderedBooks.addEventListener('change', sortBooks);
