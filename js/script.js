// script.js

// script.js - CONNECTED TO SUPABASE

// 1. CONFIGURATION: Connect to your Supabase Project
// COPY THESE FROM YOUR SUPABASE DASHBOARD -> SETTINGS -> API
const supabaseUrl = 'https://cefurgzwpgvezsdrchcp.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZnVyZ3p3cGd2ZXpzZHJjaGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NjM3OTIsImV4cCI6MjA4MzMzOTc5Mn0.hsgX17Z5p28zTqOVg0cmQ_CKp_jZdKQnP0KaMGE44dM';

// Initialize the client (The connection manager)
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// We still need this "shelf" variable, but it starts empty now!
let bookCatalogue = [];

// 2. THE NEW FUNCTION: Fetch data from the Cloud
async function fetchBooks() {
    const container = document.getElementById('catalogue-container');
    container.innerHTML = '<h2>Loading Books from the Cloud...</h2>';

    // Ask Supabase for ALL rows in the 'books' table
    // .select('*') means "Select All Columns"
    const { data, error } = await supabase
        .from('books')
        .select('*');

    if (error) {
        console.error("Error fetching books:", error);
        container.innerHTML = '<p class="error">Something went wrong loading the books.</p>';
    } else {
        // Success! Save the data to our local shelf
        bookCatalogue = data;
        
        // Update the screen
        renderBooks(bookCatalogue);
    }
}

// 3. THE RENDER FUNCTION (Displaying the books)
function renderBooks(booksToDisplay) {
    const container = document.getElementById('catalogue-container');
    container.innerHTML = ''; 

    if (booksToDisplay.length === 0) {
        container.innerHTML = `<p class="no-results">Sorry, no books found matching that search!</p>`;
    } else {
        booksToDisplay.forEach(book => {
            // Note: We use book.cover_url now (matching your database column)
            // If cover_url is empty, we fall back to a grey gradient so it doesn't break
            const imageUrl = book.cover_url || '';
            const backgroundStyle = `background-image: linear-gradient(rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.90)), url('${imageUrl}');`;
            
            const bookHTML = `
                <div class="book-card" style="${backgroundStyle}">
                    <h3>${book.title}</h3> 
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Format:</strong> ${book.format}</p>
                    <p class="status-${book.status ? book.status.toLowerCase() : 'unread'}">Status: ${book.status}</p>
                    <p><strong>Rating:</strong> ${book.rating} / 10</p>
                    <p class="book-blurb">${book.blurb}</p>
                </div>
            `;
            container.innerHTML += bookHTML;
        });
    }
}

// 4. EVENT LISTENERS (Search Button)
const searchBtn = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resetBtn = document.getElementById('reset-button');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBooks = bookCatalogue.filter(book => {
        return book.title.toLowerCase().includes(searchTerm) || 
               book.author.toLowerCase().includes(searchTerm);
    });
    renderBooks(filteredBooks);
});

resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    renderBooks(bookCatalogue);
});

// 5. START THE ENGINE
// Instead of just rendering immediately, we now FETCH first.
fetchBooks();