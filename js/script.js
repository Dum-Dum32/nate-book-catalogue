// script.js - CONNECTED TO SUPABASE

// 1. CONFIGURATION
const supabaseUrl = 'https://cefurgzwpgvezsdrchcp.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZnVyZ3p3cGd2ZXpzZHJjaGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NjM3OTIsImV4cCI6MjA4MzMzOTc5Mn0.hsgX17Z5p28zTqOVg0cmQ_CKp_jZdKQnP0KaMGE44dM';

// Initialize the client
// FIX: We changed the name from 'supabase' to 'supabaseClient' to avoid the name clash!
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

let bookCatalogue = [];

// 2. THE NEW FUNCTION
async function fetchBooks() {
    const container = document.getElementById('catalogue-container');
    container.innerHTML = '<h2>Loading Books from the Cloud...</h2>';

    // FIX: We use 'supabaseClient' here now
    const { data, error } = await supabaseClient
        .from('books')
        .select('*');

    if (error) {
        console.error("Error fetching books:", error);
        container.innerHTML = '<p class="error">Something went wrong loading the books.</p>';
    } else {
        bookCatalogue = data;
        renderBooks(bookCatalogue);
    }
}

// 3. THE RENDER FUNCTION
function renderBooks(booksToDisplay) {
    const container = document.getElementById('catalogue-container');
    container.innerHTML = ''; 

    if (booksToDisplay.length === 0) {
        container.innerHTML = `<p class="no-results">Sorry, no books found matching that search!</p>`;
    } else {
        booksToDisplay.forEach(book => {
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

// 4. EVENT LISTENERS
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
fetchBooks();