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
        blurb: "After one trick too many, Loki is banished to live on Earth as a 'normal' school boy. Forbidden from using his awesome godly powers, he must show moral improvement.",
        status: "Read",
        rank: 10
    },
    {
        name: "Loki: A Bad God's Guide to Taking the Blame",
        author: "Louie Stowell",
        isbn: "9781529501223",
        genre: "Comedy / Fantasy",
        readingAge: "8 - 12",
        blurb: "Odin gives Loki a second chance, but when Thor’s hammer goes missing, everyone blames Loki. He must find the hammer and uncover the real thief to clear his name.",
        status: "Read",
        rank: 10
    },
    {
        name: "Loki: A Bad God's Guide to Ruling the World",
        author: "Louie Stowell",
        isbn: "9781529501230", 
        genre: "Comedy / Fantasy",
        readingAge: "8 - 12",
        blurb: "Loki and Thor are sent to a new school where they must endure annoyingly perfect students and a mystery that threatens the world.",
        status: "Read",
        rank: 10
    },
    {
        name: "Loki: A Bad God's Guide to Making Enemies",
        author: "Louie Stowell",
        isbn: "9781529515800",
        genre: "Comedy / Fantasy",
        readingAge: "8 - 12",
        blurb: "Loki has to make friends to save the world. Unfortunately, he is much better at making enemies. He must survive a magical duel against a vengeful elf.",
        status: "Read",
        rank: 10
    },
    {
        name: "Loki: A Bad God's Guide to Causing Chaos",
        author: "Louie Stowell",
        isbn: "9781529515817",
        genre: "Comedy / Fantasy",
        readingAge: "8 - 12",
        blurb: "Loki must sort out the chaos that erupts after the goddess Freyja arrives in town—or face terrible consequences.",
        status: "Read",
        rank: 10
    },
    {
        name: "Loki: Tales of a Bad God (World Book Day)",
        author: "Louie Stowell",
        isbn: "9781529519723",
        genre: "Short Stories",
        readingAge: "8 - 12",
        blurb: "A collection of thrilling tales starring Loki, including a story about Thor almost marrying a giant and Loki as a robot.",
        status: "Read",
        rank: 10
    },
    {
        name: "Loki: A Bad God's Guide to Unruly Activities",
        author: "Louie Stowell",
        isbn: "9781529515787",
        genre: "Activity Book",
        readingAge: "8 - 12",
        blurb: "Tricks, pranks, puzzles, and games from the Norse god of mischief. Includes quizzes, riddles, and short stories.",
        status: "Read",
        rank: 10
    }
];

// ... The rest of your code (renderBooks, event listeners) stays exactly the same!


// This is our "Recipe" (Function) for showing books on the screen
function renderBooks(booksToDisplay) {
    const container = document.getElementById('catalogue-container');
    container.innerHTML = ''; 

    // THE NEW LOGIC STARTS HERE
    if (booksToDisplay.length === 0) {
        // If no books match, show this message instead
        container.innerHTML = `<p class="no-results">Sorry, no books found matching that search!</p>`;
    } else {
        // Otherwise, do exactly what we did before
        booksToDisplay.forEach(book => {
            const bookHTML = `
                <div class="book-card">
                    <h3>${book.name}</h3>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Genre:</strong> ${book.genre}</p>
                    <p><strong>Reading Age:</strong> ${book.readingAge}</p>
                    <p class="status-${book.status.toLowerCase()}">Status: ${book.status}</p>
                    <p><strong>Your Rank:</strong> ${book.rank} / 10</p>
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