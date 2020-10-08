// Book Constructor
function Book(title, author, isbn){
    this.title=title;
    this.author = author;
    this.isbn=isbn;
}


// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function(book){
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

// Show alerts
UI.prototype.showAlert = function(message, className) {
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

// Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
        // Show Message
        ui.showAlert('Book Removed!', 'success');
    }
}

// Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listeners

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

    console.log('you arent retarded');

    // Instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    e.preventDefault();
});