// Select the results container element
let resultsContainer = document.getElementsByClassName("container")[0];

// Variable to store the debounce timer
let debounceTimer;

// Debounce function to delay the execution of a function
const debounce = (func, delay) => {
  // Clear any previously set timer
  clearTimeout(debounceTimer); 
  // Set a new timer with the specified delay
  debounceTimer = setTimeout(func, delay); 
};

// Function to validate the input and trigger the search
const validateInput = (el) => {
  if (el.value === "") {
    resultsContainer.innerHTML = "<p>Type something in the above search input</p>";
  } else {
  // Apply debounce with a delay of 300 milliseconds
    debounce(() => generateResults(el.value, el), 300); 
  }
};

// Function to generate the search results
const generateResults = (searchValue, inputField) => {
  // Fetch data from the Wikipedia API
  fetch(
    "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" +
      searchValue
  )
    .then((response) => response.json())
    .then((data) => {
      let results = data.query.search;
      let numberOfResults = data.query.search.length;
	  // Clear the results container
      resultsContainer.innerHTML = ""; 

      // Iterate over the results and create result elements
      for (let i = 0; i < numberOfResults; i++) {
        let result = document.createElement("div");
        result.classList.add("results");
        result.innerHTML = `
          <div>
              <h3>${results[i].title}</h3>
              <p>${results[i].snippet}</p>
          </div>
          <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
          `;
		  // Append the result element to the container
        resultsContainer.appendChild(result); 
      }

      // Display a message if the input field is empty
      if (inputField.value === "") {
        resultsContainer.innerHTML = "<p>Type something in the above search input</p>";
      }
    });
};


      
