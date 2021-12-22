document.querySelector("#img").addEventListener("change", function () {
  var reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem("recent", reader.result);
  });
  reader.readAsDataURL(this.files[0]);
});

class Book {
  constructor(title, author, isbn, price, img) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.img = localStorage.getItem("recent");
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    let list = document.querySelector("#book-list");
    let url = `https://books.google.com.bd/books?vid=ISBN`;
    let name = book.isbn;
    url += name;
    let link = '<a href ="' + url + '">' + name + "</a>";
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${link}</td>
        <td>${book.price}</td>
        <td><img src="${book.img}" alt="" border=3 height=150 width=125></img></td>
        <td><a href="#" class="btn btn-dark dark">EDIT</a></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static editBook(el) {
    if (el.classList.contains("dark")) {
      var isbnEdit =
        el.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent;
      Store.startEdit(isbnEdit);
    }
  }
  static showEditedBooks(BookDetails) {
    document.querySelector("#title").value = BookDetails.title;
    document.querySelector("#author").value = BookDetails.author;
    document.querySelector("#isbn").value = BookDetails.isbn;
    document.querySelector("#price").value = BookDetails.price;
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector(".alert").remove(), 1000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#img").value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    console.log(books);
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        console.log(index);

        books.splice(index, 1);
        //UI.showAlert('Book Removed', 'success');
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

  static startEdit(isbnEdit) {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    for (var i = 0; i < storedBooks.length; i++) {
      if (storedBooks[i].isbn == isbnEdit) {
        UI.showEditedBooks(storedBooks[i]);
      }
    }

    Store.removeBook(isbnEdit);
  }
}

document.addEventListener("DOMContentLoaded", UI.displayBooks);

document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  const price = document.querySelector("#price").value;
  const img = document.querySelector("#img").value;

  if (
    title === "" ||
    author === "" ||
    isbn === "" ||
    price === "" ||
    img === ""
  ) {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    const book = new Book(title, author, isbn, price, img);

    UI.addBookToList(book);

    Store.addBook(book);

    UI.showAlert("Book Added", "success");

    UI.clearFields();
  }
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  Store.removeBook(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.previousElementSibling.textContent
  );

  UI.editBook(e.target);
});
