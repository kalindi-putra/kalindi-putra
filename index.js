// Write your code below:
// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const username = document.getElementById("Expense").value;
    const email = document.getElementById("Category").value;

    // Create user object
    const user = {
        username: username,
        email: email,
    };

    // Retrieve existing users from local storage or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Add new user to the array
    users.push(user);

    // Store the updated user array in local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Clear form fields
    document.getElementById("Expense").value = "";
    document.getElementById("Category").value = "";
    

    // Update the user list displayed on the page
    updateUserList(users);
}

// Function to update the user list displayed on the page
function updateUserList(users) {
    const userList = document.getElementById("userList");

    // Clear existing list items
    userList.innerHTML = "";

    // Iterate through each user and create list items to display their details
    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `Expense_Cateogory: ${user.username}, Amount: ${user.email}`;
        userList.appendChild(li);
    });
}

// Update the user list when the page loads
window.onload = function() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    updateUserList(users);
};
