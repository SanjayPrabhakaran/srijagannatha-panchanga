scriptname="sjpformatter.js";
console.log(scriptname+"........");

function objectArrayToTable(objArray) {
    if (objArray.length === 0) {
        return "<table><tr><td>No data available</td></tr></table>";
    }

    // Create table element
    let table = "<table border='1'><thead><tr>";

    // Get the keys from the first object for table headers
    const keys = Object.keys(objArray[0]);
    keys.forEach((key, index) => {
        // Skip the "key_link" header
        if (key !== "key_link") {
            table += `<th>${key}</th>`;
        }
    });
    table += "</tr></thead><tbody>";

    // Iterate over each object and create a table row
    objArray.forEach(obj => {
        table += "<tr>";
        keys.forEach((key, index) => {
            if (key === "key" && keys[index + 1] === "key_link") {
                // Create a hyperlink for the "key" column
                table += `<td><a href="${obj[keys[index + 1]]}">${obj[key]}</a></td>`;
            } else if (key !== "key_link") {
                // Regular table cell for other columns
                table += `<td>${obj[key]}</td>`;
            }
        });
        table += "</tr>";
    });

    table += "</tbody></table>";
    return table;
}

// Example usage
const data = [
    { name: "Alice", age: 25, key: "Profile", key_link: "https://example.com/alice", city: "New York" },
    { name: "Bob", age: 30, key: "Profile", key_link: "https://example.com/bob", city: "San Francisco" },
    { name: "Charlie", age: 35, key: "Profile", key_link: "https://example.com/charlie", city: "Los Angeles" }
];

console.log(objectArrayToTable(data));
console.log(scriptname+"........LOADED");
