const fullName = "John Jake B. Dela Cruz";

// Split the full name into an array of parts using whitespace as the delimiter
const nameParts = fullName.split(" ");

// Initialize variables to store first name, middle name, and surname
let firstName = "";
let middleName = "";
let surname = "";

// Check if the full name contains a middle initial
if (nameParts.length > 2 && nameParts[2].length === 2 && nameParts[2].endsWith(".")) {
    // If the third part is a two-letter string ending with a period, consider it as the middle initial
    firstName = nameParts[0];
    middleName = nameParts[1] + " " + nameParts[2];
    surname = nameParts.slice(3).join(" "); // Combine the remaining parts as the surname
} else {
    // If there is no middle initial, follow the previous logic
    firstName = nameParts[0];
    surname = nameParts.slice(1).join(" ");
}

// Now you have firstName, middleName, and surname, which you can use as needed
console.log("First Name:", firstName);
console.log("Middle Name:", middleName);
console.log("Surname:", surname);