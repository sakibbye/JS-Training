class Books {
    static showBooks() {
      
      let books = JSON.parse(localStorage.getItem('books'));
      books.forEach((book) => Books.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#books');

        const row = document.createElement('tr');
    
        row.innerHTML = `
          <td>${book.bookName}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td>${book.price}$</td>
          <td><img src="${book.image}" alt="" border=3 height=150 width=125></img></td>
        `;
    
        list.appendChild(row);
      }    
}

Books.showBooks();
