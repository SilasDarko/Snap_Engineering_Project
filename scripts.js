/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */


// import adinkra symbols

async function getSymbols() {
  const res = await fetch("src/data/adinkraSymbols.json")
  return await res.json()
}

async function getImages() {
  const res = await fetch("src/data/adinkraImages.json")
  return await res.json()
}

// Store all symbols here so other functions can use them
let allSymbols = [];

async function buildData() {
  const symbols = await getSymbols()
  allSymbols = Object.values(symbols)
  populateCategories()
  showCards(allSymbols)
}

buildData()

// Add each category as an option in the dropdown
function populateCategories() {
  const select = document.getElementById("category-filter")
  const categories = []

  for (const symbol of allSymbols) {
    if (!categories.includes(symbol.category)) {
      categories.push(symbol.category)
    }
  }

  categories.sort()

  for (const category of categories) {
    const option = document.createElement("option")
    option.value = category
    option.textContent = category
    select.appendChild(option)
  }
}

// Show only the cards that match the selected category
function filterCards() {
  const selectedCategory = document.getElementById("category-filter").value

  if (selectedCategory === "All") {
    showCards(allSymbols)
    return
  }

  const filtered = []
  for (const symbol of allSymbols) {
    if (symbol.category === selectedCategory) {
      filtered.push(symbol)
    }
  }

  showCards(filtered)
}

function showCards(symbols) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (const symbol of symbols) {
    const nextCard = templateCard.cloneNode(true);
    editCardContent(nextCard, symbol.name, "src/symbols/" + symbol.image, symbol.description, symbol.proverb, symbol.category, symbol.countryFlag);
    cardContainer.appendChild(nextCard);
  }
}

function editCardContent(card, newTitle, newImageURL, description, proverb, category, countryFlag) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Poster";

  card.querySelector(".country-flag").textContent = countryFlag;

  const listItems = card.querySelectorAll("li");
  listItems[0].textContent = description;
  listItems[1].textContent = proverb;
  listItems[2].textContent = "Category: " + category;

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}

document.addEventListener("DOMContentLoaded", buildData);

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!",
  );
}

function removeLastCard() {
  allSymbols.pop()
  showCards(allSymbols)
}
