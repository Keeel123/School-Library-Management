function showSection(section) {
    if (section === 'catalog') {
        document.getElementById('catalogSection').style.display = 'block';
        document.getElementById('addSection').style.display = 'none';
    } else {
        document.getElementById('catalogSection').style.display = 'none';
        document.getElementById('addSection').style.display = 'block';
    }
    document.getElementById('alertBox').classList.add('d-none');
}


async function loadBooks() {
    try {
        const response = await fetch('api.php?action=getBooks');
        const result = await response.json();
        const catalog = document.getElementById('catalog');
        const countEl = document.getElementById('bookCount');

        if (result.status === 'error') {
            catalog.innerHTML = '<p class="text-danger">Error: ' + result.message + '</p>';
            return;
        }

        if (result.data.length === 0) {
            catalog.innerHTML = '<p class="text-muted">No books found. Add a book above!</p>';
            countEl.textContent = '(0 books)';
            return;
        }

        if (result.data.length === 1) {
            countEl.textContent = '(1 book)';
        } else {
            countEl.textContent = '(' + result.data.length + ' books)';
        }

        catalog.innerHTML = result.data.map(book => `
            <div class="col-md-4 mb-3">
                <div class="book-card">
                    <span class="badge bg-secondary mb-2">
                        BOOK-${String(book.Book_ID).padStart(4, '0')}
                    </span>
                    <h5>${book.Title}</h5>
                    <p class="mb-1">${book.Author}</p>
                    <p class="mb-1 text-muted small">${book.Isbn || ''}</p>
                    <span class="badge bg-dark">${book.Genre}</span>
                    <span class="badge bg-secondary">${book.Year}</span>
                </div>
            </div>
        `).join('');

    } catch (err) {
        console.error('Error loading books:', err);
        document.getElementById('catalog').innerHTML = '<p class="text-danger">Failed to load books!</p>';
    }
}


async function addBook() {
    clearErrors();

    const title  = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const isbn   = document.getElementById('isbn').value.trim();
    const genre  = document.getElementById('genre').value;
    const year   = document.getElementById('year').value.trim();

    let hasError = false;

    if (!title) {
        showFieldError('title', 'Title is required!');
        hasError = true;
    }

    if (!author) {
        showFieldError('author', 'Author is required!');
        hasError = true;
    }

    if (!genre) {
        showFieldError('genre', 'Please select a genre!');
        hasError = true;
    }

    if (!year) {
        showFieldError('year', 'Year is required!');
        hasError = true;
    } else if (isNaN(year)) {
        showFieldError('year', 'Year must be a number!');
        hasError = true;
    } else if (year < 1000 || year > 2099) {
        showFieldError('year', 'Year must be between 1000 and 2099!');
        hasError = true;
    }

    if (hasError) return;

    try {
        const response = await fetch('api.php?action=addBook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Title: title, Author: author, Isbn: isbn, Genre: genre, Year: parseInt(year) })
        });

        const result = await response.json();

        if (result.status === 'error') {
            if (result.field) {
                showFieldError(result.field, result.message);
            } else {
                showAlert(result.message, 'danger');
            }
            return;
        }

        showAlert(result.message, 'success');
        clearForm();
        showSection('catalog');
        loadBooks();

    } catch (err) {
        console.error('Error adding book:', err);
        showAlert('Something went wrong! Please try again.', 'danger');
    }
}


function showFieldError(fieldId, message) {
    document.getElementById(fieldId).classList.add('is-invalid');
    document.getElementById(fieldId + 'Error').textContent = message;
}


function clearErrors() {
    const fields = ['title', 'author', 'isbn', 'genre', 'year'];
    for (let i = 0; i < fields.length; i++) {
        document.getElementById(fields[i]).classList.remove('is-invalid');
        document.getElementById(fields[i] + 'Error').textContent = '';
    }
    document.getElementById('alertBox').classList.add('d-none');
}


function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.className = 'alert alert-' + type;
    alertBox.textContent = message;
    alertBox.classList.remove('d-none');
    setTimeout(() => alertBox.classList.add('d-none'), 3000);
}


function clearForm() {
    document.getElementById('title').value  = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value   = '';
    document.getElementById('genre').value  = '';
    document.getElementById('year').value   = '';
    clearErrors();
}

// Run on page load
loadBooks();