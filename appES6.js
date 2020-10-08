class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');
    
        // Create TR element (table row)
        const row = document.createElement('tr');

        // Insert Columns
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className) {
        // New Div
        const div = document.createElement('div');

        // Add classes
        div.className = `alert ${className}`;

        // Add text
        div.appendChild(document.createTextNode(message));

        // Get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        // Inserts ALERT before BOOK-FORM
        container.insertBefore(div, form);

        // Alert begone after 3s
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage Class
class Store {
    static getBooks(){
        let books;
        // Check if exists in local storage and get it
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        // Call static method to pull LS books
        const books = Store.getBooks();

        // Append new book to end of books array
        books.push(book);

        // Re save books array in LS
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        // Re save books array in LS
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event Listeners

// DOM Load
document.addEventListener('DOMContentLoaded' , Store.displayBooks);

// Add Book
document.getElementById('book-form').addEventListener('submit', function(e){
    
    // Get Form UI Values
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

    // Instantiate a book
    const book = new Book(title, author, isbn);

    // Instantiate a UI Object
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in the missing fields.', 'error');
    }
    else {
        // Add book to list
        ui.addBookToList(book);

        // Add Book To LOCAL STORAGE 
        // Don't need to instantiate store since we're using static methods
        Store.addBook(book);

        // Show success 
        ui.showAlert('Book Added!', 'success');
    
        // Clear fields
        ui.clearFields();
    }
    
    // Prevent default submit behavior
    e.preventDefault();
});

// Event DELEGATION for DELETION
document.getElementById('book-list').addEventListener('click', function(e){

    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Remove from LS
    // The X is the A tag, it's parent is the TR and it's previous sibling is the ISBN TR
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show Message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
});