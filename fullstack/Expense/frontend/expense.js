//const axios=require('axios');
// Function to add user details
async function addUser(event) {
    event.preventDefault();

    const itemname = document.getElementById('itemname').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    try {
        // POST request to store user details
        const response = await axios.post('http://localhost:4000/admin/add-user', {
            itemname,
            quantity,
            price
        });
        if(response.status !== 200)
        {
            console.log(response.data);

            window.alert('Unable to add expense !');
        }
        console.log(response.data);
        window.alert("Expense added successfully");

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
        const response = await axios.get('http://localhost:4000/admin/get-user');
        //const users = response.data;
        
        const users = Array.isArray(response.data) ? response.data : [response.data];



        const userList = document.getElementById('data');
        userList.innerHTML = '';

        users.forEach(user => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <p>itemname: ${user.itemname}, quantity: ${user.quantity}, price: ${user.price}
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
        const response=  await axios.get(`http://localhost:4000/admin/edit-user/${userId}`);

          document.getElementById('itemname').value=response.data.itemname;
          document.getElementById('quantity').value=response.data.quantity;
          document.getElementById('price').value=response.data.price;

          document.getElementById('submit').addEventListener('click',async()=>{
            const editedUser={
                itemname:document.getElementById('itemname').value,
                quantity:document.getElementById('quantity').value,
                price:document.getElementById('quantity').value
            }
           await submitedituser(userId,editedUser);
          })

    }
    catch{err=>console.log(err.data)};
}
async function submitedituser(userId,editedUser)
{
    try{
        const response=await axios.put(`http://localhost:4000/admin/put-user/${userId}`,editedUser)
        console.log('Sucess editing of user',response.data);
    }
    catch(err){console.log(err);}
}

// Function to handle deleting a user
async function deleteUser(userId) {
    try {
        // DELETE request to delete user
        const res=await axios.delete(`http://localhost:4000/admin/delete-user/${userId}`);
           
        if(res.status !== 200)
        {
            window.alert("deleted successfully");
        }
        


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
document.getElementById('expenseform').addEventListener('submit', addUser);
