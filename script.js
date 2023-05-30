// Fetch the JSON file
fetch('Gyms.json')
  .then(response => response.json())
  .then(data => {
    const gymsData = data.gyms; // Access the gym data

    // Function to create a gym card with data
    function createGymCard(gym) {
      const gymCardTemplate = document.getElementById("gymCardTemplate");

      // Clone the template content
      const gymCard = gymCardTemplate.content.cloneNode(true);

      // Set the data values
      gymCard.querySelector(".gym-image").src = gym.location.image;
      gymCard.querySelector(".gym-image").alt = gym.name;
      gymCard.querySelector(".gym-name").textContent = gym.name;
      gymCard.querySelector(".gym-contact").innerHTML = `<i class="fas fa-phone-alt" style='font-size:14px'></i> Phone: ${gym.contact.phone}`;
      gymCard.querySelector(".gym-prices").innerHTML = `<i class="fas fa-dollar-sign"></i> Prices: ${gym.contact.Prices}`;
      gymCard.querySelector(".gym-promotions").innerHTML = `<i class="fas fa-gift"></i> Promotions: ${gym.contact.Promotions}`;
      gymCard.querySelector(".gym-website").href = gym.contact.website;

      return gymCard;
    }

    // Function to display gyms
    function displayGyms(gyms) {
      const gymsContainer = document.getElementById("gymCardContainer");
      gymsContainer.innerHTML = ""; // Clear previous results

      if (gyms.length === 0) {
        const noResults = document.createElement("p");
        noResults.textContent = "No gyms found.";
        gymsContainer.appendChild(noResults);
      } else {
        gyms.forEach(gym => {
          const gymCard = createGymCard(gym);
          gymsContainer.appendChild(gymCard);
        });
      }
    }

    // Initial display of all gyms
   // displayGyms(gymsData);

    // Search function
    function searchGyms() {
      const searchInput = document.getElementById("searchInput");
      const searchValue = searchInput.value.trim().toLowerCase();

      if (searchValue) {
        const filteredGyms = gymsData.filter(gym => {
          return (
            gym.location.postcode === searchValue ||
            gym.location.city.toLowerCase() === searchValue
          );
        });

        displayGyms(filteredGyms);
      } else {
        displayGyms(gymsData);
      }
    }

    // Search button event listener
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", searchGyms);

    // Search input enter key event listener
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        searchGyms();
      }
    });
  })
  .catch(error => {
    console.error('Error retrieving gym data:', error);
  });
