//const axios=require('axios');
// Function to add user details
async function addUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    try {
        // POST request to store user details
        const response = await axios.post('http://localhost:3000/admin/add-user', {
            name,
            email,
            phone
        });
       window.alert('User added:', response.data);

        // Display user details
       // displayUsers();
    } catch (error) {
        window.alert(response.data)
        console.error(error.data);
    }

    // Reset form
    event.target.reset();
}

// Function to display user details
async function displayUsers() {
    try {
        // GET request to fetch user details
        const response = await axios.get('http://localhost:3000/admin/get-user');
        //const users = response.data;
        
        const users = Array.isArray(response.data) ? response.data : [response.data];



        const userList = document.getElementById('data');
        userList.innerHTML = '';

        users.forEach(user => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <p>Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}
                    <button onclick="editUser('${user.userId}')">Edit</button>
                    <button onclick="deleteUser('${user.userId}')">Delete</button>
                </p>
            `;
            userList.appendChild(itemElement);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Function to handle editing a user
async function editUser(userId) {
    // Implement edit functionality here
    try{
        const response=  await axios.get(`http://localhost:3000/admin/edit-user/${userId}`);

          document.getElementById('name').value=response.data.name;
          document.getElementById('email').value=response.data.email;
          document.getElementById('phone').value=response.data.phone;

          document.getElementById('submit').addEventListener('click',async()=>{
            const editedUser={
                name:document.getElementById('name').value,
                email:document.getElementById('email').value,
                phone:document.getElementById('email').value
            }
           await submitedituser(userId,editedUser);
          })

    }
    catch{err=>console.log(err.data)};
}
async function submitedituser(userId,editedUser)
{
    try{
        const response=await axios.put(`http://localhost:3000/admin/put-user/${userId}`,editedUser)
        console.log('Sucess editing of user',response.data);
    }
    catch(err){console.log(err);}
}

// Function to handle deleting a user
async function deleteUser(userId) {
    try {
        // DELETE request to delete user
        const res=await axios.delete(`http://localhost:3000/admin/delete-user/${userId}`);
            window.alert(res)
        


        // Display updated user details
        displayUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Display initial user details
document.addEventListener('DOMContentLoaded', () => {
    displayUsers();
});

// Add event listener to the form
document.getElementById('Booking app').addEventListener('submit', addUser);
