const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        'X-RapidAPI-Key': '<f84bb6648fmsh6ee15beec208e70p1b695djsn0ab80258d71f>', 
    },
};


document.getElementById("searchButton").addEventListener("click", () => {
    const cityInput = document.getElementById("cityInput").value;
    if (cityInput) {
        fetchCities(cityInput);
    } else {
        alert("Please enter a city name prefix.");
    }
});

function fetchCities(namePrefix) {
    const url = `https://${apiHost}/v1/geo/cities?namePrefix=${namePrefix}`;

    fetch(url, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": apiHost,
        },
    })
        .then((response) => response.json())
        .then((data) => displayResults(data))
        .catch((error) => console.error("Error fetching data:", error));
}

function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (data.data.length === 0) {
        resultsDiv.innerHTML = "<p>No cities found. Try another prefix.</p>";
        return;
    }

    data.data.forEach((city) => {
        const cityInfo = `
            <p>
                <strong>${city.name}, ${city.region}, ${city.country}</strong><br>
                Latitude: ${city.latitude}, Longitude: ${city.longitude}<br>
                Population: ${city.population || "N/A"}
            </p>
        `;
        resultsDiv.innerHTML += cityInfo;
    });
}
// Documentation: https://rapidapi.com/wirefreethought/api/geodb-cities/

