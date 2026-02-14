async function lookupLocation() {
    const placeNameProps = document.getElementById("placename");
    const placeName = placeNameProps.value.trim();
    if (!placeName) {
        alert("Please enter a place name.");
        return;
    }

    try {
        console.log(`Looking up location for: ${placeName}`);

        // 1. Geocoding using geocode.maps.co (Project API Key from helper.js: 698c7048282ad417680607jtm7bdd43)
        const geocodeUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(placeName)}&api_key=698c7048282ad417680607jtm7bdd43`;
        const geocodeResponse = await fetch(geocodeUrl);

        if (!geocodeResponse.ok) {
            throw new Error(`Geocoding failed: ${geocodeResponse.statusText}`);
        }

        const geocodeData = await geocodeResponse.json();

        if (geocodeData.length === 0) {
            alert("Location not found. Please try a different name.");
            return;
        }

        // Take the first result
        const location = geocodeData[0];
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.lon);

        // Update Inputs
        document.getElementById("latitude").value = lat.toFixed(4);
        document.getElementById("longitude").value = lon.toFixed(4);

        // Optional: Update display name if you want to confirm what was found
        // document.getElementById("placename").value = location.display_name;

        // 2. Timezone using Open-Meteo
        // https://open-meteo.com/en/docs#api_documentation
        console.log(`Fetching timezone for Lat: ${lat}, Lon: ${lon}`);
        const tzUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&daily=sunrise`;

        const tzResponse = await fetch(tzUrl);
        if (!tzResponse.ok) {
            throw new Error("Timezone fetch failed.");
        }

        const tzData = await tzResponse.json();
        const utcOffsetSeconds = tzData.utc_offset_seconds;

        // Convert seconds to hours (decimal)
        const timezoneOffset = utcOffsetSeconds / 3600;

        document.getElementById("timezone").value = timezoneOffset;

        alert(`Location Found:\n${location.display_name}\nLat: ${lat}, Lon: ${lon}\nTimezone: ${timezoneOffset}`);

    } catch (error) {
        console.error("Lookup Error:", error);
        alert("An error occurred while looking up the location. Check console for details.");
    }
}
