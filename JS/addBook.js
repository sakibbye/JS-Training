document.querySelector("#cover").addEventListener("change", function(){
    var reader = new FileReader();

    reader.addEventListener("load", () => {
        localStorage.setItem("recent",reader.result);
    })
    reader.readAsDataURL(this.files[0]);
})


const addBook = e => {
    let bookName = document.getElementById('bookName').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value,
        price = document.getElementById('price').value,
        image = localStorage.getItem("recent");

    let book_records=new Array();
    book_records=JSON.parse(localStorage.getItem("books"))?JSON.parse(localStorage.getItem("books")):[]
    
    if(book_records.some((v)=>{return v.isbn==isbn}))
    {
        alert("duplicate data");
    }
    else
    {
     

        book_records.push({ 
            "bookName":bookName, 
            "author":author,
            "isbn":isbn,
            "price":price,
            "image": image,
        })
        localStorage.setItem('books', JSON.stringify(book_records));
        alert("Book Added");
    }

    localStorage.removeItem("recent");

    e.preventDefault();
}
