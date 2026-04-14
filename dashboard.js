// to display books in container

// Function to fetch and display books from Google Books API
async function loadBooks(query, containerId) {
  try {
    // Fetch data from Google Books API
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();

    // Get the container where books will appear
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear old data if reloaded

    // Show 12 books only
    data.items.slice(0, 12).forEach(book => {
      const info = book.volumeInfo; // Info about book

      // Create a new div for each book
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");

      bookDiv.addEventListener("click", () => {
        openbookmodal(book);
      });

      // Fill the div with book image, title, and author
      bookDiv.innerHTML = `
        <img src="${info.imageLinks?.thumbnail || 'default.jpg'}" alt="Book cover">
        <h3>${info.title}</h3>
        <p>${info.authors ? info.authors.join(', ') : 'Unknown Author'}</p>
      `;

      // Add the new div to our main container
      container.appendChild(bookDiv);
    });
  } catch (error) {
    console.error("Error loading books:", error);
  }
}

// Load books when page opens
window.onload = function() {
  // Fetch and display student favourites
  loadBooks("fiction", "student-fav");

  // Fetch and display teacher favourites
  loadBooks("education", "teacher-fav");

  loadBooks("non-fiction","newly-added");
};



// Function to animate counters
function startCounting() {
  const counters = document.querySelectorAll('.count');
  const speed = 200; // bigger = slower

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Scroll trigger — Intersection Observer
const statSection = document.querySelector('.stat');
let counted = false; // to prevent re-trigger

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      startCounting();
      counted = true; // run only once
    }
  });
}, { threshold: 0.5 }); // 50% visible before triggering

observer.observe(statSection);


// menu bar
function togglemenu(){
  const sidepanel = document.getElementById("sidepanel");
    if(sidepanel.style.width === "250px")
    {
      sidepanel.style.width = "0";
    }else{
      sidepanel.style.width = "250px";
    }
}


//account panel
const accbtn = document.getElementById('account');
const accbox = document.getElementById('accountbox');
const closeaccbox = document.getElementById('closeaccbox');

accbtn.addEventListener('click',() =>{
  accbox.classList.add('active');
});

closeaccbox.addEventListener('click',()=>{
  accbox.classList.remove('active');
});

document.addEventListener("DOMContentLoaded",() =>{
  const userdisp = document.getElementById("user");
  const logoutbtn = document.getElementById("logoutbtn");

  const mail = sessionStorage.getItem("userEmail");
  if(mail){
    userdisp.textContent = mail;
  }else{
    userdisp.textContent = "Not available";
  }

  logoutbtn.addEventListener("click",() => {
    sessionStorage.clear();
    window.location.href = "login.html";
  });
});

//display books data
const Bookmodal = document.getElementById("bookmodal");
const Closemodal = document.getElementById("closemodal");
const Modaltn = document.getElementById("modaltn");
const Modalt = document.getElementById("modalt");
const Modala = document.getElementById("modala");
const Modald = document.getElementById("modald");
const Issuebtn = document.getElementById("issuebtn");

const searchInput = document.getElementById("search");
const searchResults = document.getElementById("search-results");


let wassearchopen = false; //see if the panel was open before or not

function closebookmodal(){
  Bookmodal.style.display = "none";
  if(wassearchopen){
    searchResults.style.display = "block";
  }
}

function openbookmodal(book) {
  Modaltn.src = book.volumeInfo.imageLinks?.thumbnail || "default.jpg";
  Modalt.textContent = book.volumeInfo.title || "No Title";
  Modala.innerHTML = "<b>Author(s) : </b>" + (book.volumeInfo.authors?.join(", ") || "Unknown");
  Modald.innerHTML = "<b>Description : </b>" + (book.volumeInfo.description || "No description available.");

  // Initialize random copies if not set
  const title = book.volumeInfo.title || "Untitled";
  if (!bookCopies[title]) {
    bookCopies[title] = Math.floor(Math.random() * 5) + 1; // random 1–5 copies
  }

  // Show available copies in modal
  let copiesEl = document.getElementById("copiesLeft");
  if (!copiesEl) {
    copiesEl = document.createElement("p");
    copiesEl.id = "copiesLeft";
    copiesEl.style.marginTop = "10px";
    copiesEl.style.fontWeight = "bold";
    Modald.insertAdjacentElement("afterend", copiesEl);
  }
  copiesEl.innerHTML = `<b>Copies Left : </b>${bookCopies[title]}`;


  // store if search panel is open before hiding it
  wassearchopen = searchResults.style.display === "block";
  searchResults.style.display = "none";

  Bookmodal.style.display = "block";

  Issuebtn.onclick = () => {
  const title = book.volumeInfo.title || "Untitled";

  // If copies available
  if (bookCopies[title] > 0) {
    bookCopies[title]--;

    // Notify user
    alert(`✅ "${title}" added to issue list.\nCopies left: ${bookCopies[title]}`);

    // --- Create a single issued-item properly ---
    const item = document.createElement("div");
    item.classList.add("issued-item");

    const titleSpan = document.createElement("span");
    titleSpan.textContent = `📘 ${title}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    // Remove button logic
    removeBtn.onclick = () => {
      issueListContainer.removeChild(item);
      bookCopies[title]++;
      alert(`❎ Removed "${title}" from issue list.\nCopies left: ${bookCopies[title]}`);
      const copiesEl = document.getElementById("copiesLeft");
      if (copiesEl)
        copiesEl.innerHTML = `<b>Copies Left : </b>${bookCopies[title]}`;
    };

    // Append to issue list
    item.appendChild(titleSpan);
    item.appendChild(removeBtn);
    [...issueListContainer.children].forEach(child => {
        if (child.textContent.trim() === title && !child.querySelector("button")) {
          issueListContainer.removeChild(child);
        }
      });

    issueListContainer.appendChild(item);

    // Update copy count in modal
    const copiesEl = document.getElementById("copiesLeft");
    if (copiesEl)
      copiesEl.innerHTML = `<b>Copies Left : </b>${bookCopies[title]}`;
  } else {
    alert(`❌ No copies of "${title}" left.`);
  }
};



}

// ✅ Function to close modal and restore search results if they were visible
function closebookmodal() {
  Bookmodal.style.display = "none";

  // If search was open before opening modal, restore it
  if (wassearchopen) {
    setTimeout(() => {
      searchResults.style.display = "block";
    }, 200);
  }
}

// ✅ When "X" (close) is pressed
Closemodal.addEventListener("click", closebookmodal);

// ✅ When user clicks outside modal
window.addEventListener("click", (event) => {
  if (event.target === Bookmodal) {
    closebookmodal();
  }
});


//display searched book
searchInput.addEventListener("input", async function () {
  const query = this.value.trim();

  if (!query) {
    searchResults.innerHTML = "";
    searchResults.style.display = "none";
    return;
  }

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=40`);
    const data = await response.json();

    searchResults.innerHTML = "";

    if (!data.items || data.items.length === 0) {
      searchResults.innerHTML = "<p style='color:white;text-align:center;'>No results found.</p>";
    } else {
      data.items.forEach(book => {
  const info = book.volumeInfo;
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book-result");

  // When a book is clicked
  bookDiv.addEventListener("click", () => {
    openbookmodal(book);          // open the modal
    searchResults.style.display = "none"; // hide search panel
  });

  bookDiv.innerHTML = `
    <img src="${info.imageLinks?.thumbnail || 'default.jpg'}" alt="Book Cover">
    <div>
      <h4>${info.title}</h4>
      <p>${info.authors ? info.authors.join(', ') : 'Unknown Author'}</p>
    </div>
  `;

  searchResults.appendChild(bookDiv);
});

    }

    searchResults.style.display = "block";

  } catch (error) {
    console.error("Error fetching books:", error);
    searchResults.innerHTML = "<p style='color:red;text-align:center;'>Something went wrong.</p>";
    searchResults.style.display = "block";
  }
});

// Close results panel if clicked outside
window.addEventListener("click", (e) => {
  //prevents hiding search when modal open
  if(Bookmodal.style.display === "block") return;
  
  if (!searchResults.contains(e.target) && e.target !== searchInput) {
    searchResults.style.display = "none";
  }
});


const closesearchbtn = document.getElementById("close-search");

closesearchbtn.addEventListener("click", ()=>{
  searchResults.style.display = "none";
});



//issue list
const issueListBox = document.getElementById("ilbox");
const issueListContainer = document.getElementById("ilcontainer");
const closeIssueListBtn = document.getElementById("closeil");
let issuedBooks = [];
let bookCopies = {};

// Issuebtn.addEventListener("click", () => {
//   const title = Modalt.textContent;
//   if (!issuedBooks.includes(title)) {
//     issuedBooks.push(title);
//     const item = document.createElement("div");
//     item.textContent = `📘 ${title}`;
//     issueListContainer.appendChild(item);
//   }
//   // alert(`"${title}" added to Issue List!`);
// });

document.querySelector("#sidepanel a[href='#issuelist']")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    issueListBox.style.display = "block";
});

closeIssueListBtn.addEventListener("click", () => {
  issueListBox.style.display = "none";
});
