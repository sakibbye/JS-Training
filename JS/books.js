class Books {
    static showBooks() {
      
      let books = JSON.parse(localStorage.getItem('books'));
      books.forEach((book) => Books.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#books');

        const row = document.createElement('tr');
    
        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td>${book.price}$</td>
          <td><img src="${book.img}" alt="" border=3 height=150 width=125></img></td>
          <td><a href="saveBook.html" onclick="edit(${book.isbn})" class="btn btn-success">EDIT</a></td>
        `;
    
        list.appendChild(row);
      }    
}

Books.showBooks();
