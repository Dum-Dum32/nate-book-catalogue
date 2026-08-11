// script.js

// This variable (our "shelf") will hold all the book objects (our "books")
// Using the 'const' keyword means this variable cannot be changed later.
// script.js

// This variable (our "shelf") will hold all the book objects (our "books")
// script.js

const bookCatalogue = [
    {
        name: "Loki: A Bad God's Guide to Being Good",
        author: "Louie Stowell",
        isbn: "9781406399752",
        genre: "Comedy / Fantasy",
        readingAge: "8 - 12",
        blurb: "After one trick too many, Loki is banished to live on Earth as a 'normal' school boy.",
        status: "Read",
        rank: 9,
        image: "images/loki1.jpg" // <--- Make sure your file is named this!
    },
    {
        name: "Loki: A Bad God's Guide to Taking the Blame",
        author: "Louie Stowell",
        isbn: "9781529501223",
        genre: "Comedy / Fantasy",
        readingAge: "8 - 12",
        blurb: "Odin gives Loki a second chance, but when Thor’s hammer goes missing, everyone blames Loki.",
        status: "Read",
        rank: 10,
        image: "images/loki2.jpg"
    },
    {
        name: "Loki: A Bad God's Guide to Ruling the World",
        author: "Louie Stowell",
        isbn: "9781529501230", 
        genre: "Comedy / Fantasy",
        readingAge: "8 - 12",
        blurb: "Loki and Thor are sent to a new school where they must endure annoyingly perfect students.",
        status: "Read",
        rank: 10,
        image: "images/loki3.jpg"
    },
    {
        name: "Loki: A Bad God's Guide to Making Enemies",
        author: "Louie Stowell",
        isbn: "9781529515800",
        genre: "Comedy / Fantasy",
        readingAge: "8 - 12",
        blurb: "Loki has to make friends to save the world. Unfortunately, he is much better at making enemies.",
        status: "Read",
        rank: 10,
        image: "images/loki4.jpg"
    },
    {
        name: "Loki: A Bad God's Guide to Causing Chaos",
        author: "Louie Stowell",
        isbn: "9781529515817",
        genre: "Comedy / Fantasy",
        readingAge: "8 - 12",
        blurb: "Loki must sort out the chaos that erupts after the goddess Freyja arrives in town.",
        status: "Read",
        rank: 10,
        image: "images/loki5.jpg"
    },
    {
        name: "Loki: Tales of a Bad God (WBD)",
        author: "Louie Stowell",
        isbn: "9781529519723",
        genre: "Short Stories",
        readingAge: "8 - 12",
        blurb: "A collection of thrilling tales starring Loki, including a story about Thor almost marrying a giant.",
        status: "Read",
        rank: 10,
        image: "images/loki_wbd.jpg"
    },
    {
        name: "Loki: A Bad God's Guide to Unruly Activities",
        author: "Louie Stowell",
        isbn: "9781529515787",
        genre: "Activity Book",
        readingAge: "8 - 12",
        blurb: "Tricks, pranks, puzzles, and games from the Norse god of mischief.",
        status: "Read",
        rank: 10,
        image: "images/loki_activity.jpg"
    }
];

// ... The rest of your code (renderBooks, event listeners) stays exactly the same!


function renderBooks(booksToDisplay) {
    const container = document.getElementById('catalogue-container');
    container.innerHTML = ''; 

    if (booksToDisplay.length === 0) {
        container.innerHTML = `<p class="no-results">Sorry, no books found matching that search!</p>`;
    } else {
        booksToDisplay.forEach(book => {
            // We create a special style specifically for this card's background
            // The "linear-gradient" part creates a see-through white layer (0.85 opacity) on top of the image
            const backgroundStyle = `background-image: linear-gradient(rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.90)), url('${book.image}');`;
            
            const bookHTML = `
                <div class="book-card" style="${backgroundStyle}">
                    <h3>${book.name}</h3>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Genre:</strong> ${book.genre}</p>
                    <p><strong>Reading Age:</strong> ${book.readingAge}</p>
                    <p class="status-${book.status.toLowerCase()}">Status: ${book.status}</p>
                    <p><strong>Your Rank:</strong> ${book.rank} / 10</p>
                    <p class="book-blurb">${book.blurb}</p>
                </div>
            `;
            container.innerHTML += bookHTML;
        });
    }
}


// Show all books when the page first loads
renderBooks(bookCatalogue);

// The "Ear": Find the Search & Reset buttons and the input box
const searchBtn = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resetBtn = document.getElementById('reset-button');

// The next parts only run after clicking the search or reset button

// Tell the Search button to listen for a 'click'
searchBtn.addEventListener('click', () => {
    // Get the word the user typed and make it lowercase (so 'Loki' and 'loki' both work!)
    const searchTerm = searchInput.value.toLowerCase();

    // 4. The "Filter": Create a new list of only the matching books
    const filteredBooks = bookCatalogue.filter(book => {
        return book.name.toLowerCase().includes(searchTerm) || 
               book.author.toLowerCase().includes(searchTerm);
    });

    // 5. Use our recipe to show only the filtered books!
    renderBooks(filteredBooks);
});

// Tell the Reset button to listen for a 'click'
resetBtn.addEventListener('click', () => {
    // 1. Clear the text in the search box
    searchInput.value = '';

    // 2. Show the full original catalogue
    renderBooks(bookCatalogue);
});