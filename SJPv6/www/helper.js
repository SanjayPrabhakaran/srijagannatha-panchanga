scriptname = "helper.js";
console.log(scriptname + "........");
function getExecutingFileName() {
    const err = new Error();
    // In some browsers (like Firefox), the stack might not populate 
    // until the error is actually thrown.
    const stack = err.stack || "";
    const lines = stack.split('\n');

    // We look at index 2 (the caller). If index 2 is empty, we check index 1.
    const callerLine = lines[2] || lines[1] || "";

    // Regex breakdown:
    // 1. Look for a forward slash /
    // 2. Capture everything that isn't a slash, colon, or space
    // 3. Stop once we hit .js
    const match = /([^\/\s]+\.js)/.exec(callerLine);

    return match ? match[1] : "Unknown";
}
// Alternative geocoding using a different service (backup)
async function lookupLocationAlternative(locationName = document.getElementById('locationName').value.trim()) {
    if (!locationName) return;

    try {
        // Using geocode.maps.co (free API, no key required for basic use)
        const response = await fetch(
            `https://geocode.maps.co/search?q=${encodeURIComponent(locationName)}&api_key=698c7048282ad417680607jtm7bdd43`
        );

        if (!response.ok) {
            throw new Error('Geocoding service unavailable');
        }

        const data = await response.json();

        if (data.length === 0) {
            return null;
        }

        return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
            display_name: data[0].display_name
        };
    } catch (error) {
        console.error('Alternative geocoding error:', error);
        return null;
    }
}
console.log(k = lookupLocationAlternative("Chennai"));
console.log(scriptname + "........LOADED");
