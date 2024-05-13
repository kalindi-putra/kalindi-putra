// Function to add vegetable details
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
async function addVegetable(event) {
    event.preventDefault();

    const name = document.getElementById('vegetable-name').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    try {
        // POST request to store vegetable details
        const response = await axios.post(proxyUrl+'https://crudcrud.com/api/e6055305aa744303b0fe3184ee2f3a9d/vegetables', {
            name,
            quantity: parseInt(quantity),
            price: parseFloat(price)
        });
        console.log('Vegetable added:', response.data);

        // Display vegetable details
        displayVegetables();
    } catch (error) {
        console.error('Error adding vegetable:', error);
    }

    // Reset form
    event.target.reset();
}

// Function to display vegetable details
async function displayVegetables() {
    try {
        // GET request to fetch vegetable details
        const response = await axios.get(proxyUrl+'https://crudcrud.com/api/e6055305aa744303b0fe3184ee2f3a9d/vegetables');
        const vegetables = response.data;

        const vegetableList = document.getElementById('vegetable-list');
        vegetableList.innerHTML = '';

        vegetables.forEach(vegetable => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <p>Name: ${vegetable.name}, Quantity(KG): ${vegetable.quantity}, Price:${vegetable.price}
                    <button onclick="buyVegetable('${vegetable._id}')">Buy</button>
                    <button onclick="deleteVegetable('${vegetable._id}')">Delete</button>
                </p>
            `;
            vegetableList.appendChild(itemElement);

            // Assuming the code was within a loop
            let loopHasRunOnce=false;
if (loopHasRunOnce === false) {
    const totalItemsHeading = document.createElement('h2');
    totalItemsHeading.textContent = `Total Items: ${vegetables.length}`;
    vegetableList.appendChild(totalItemsHeading);
    loopHasRunOnce = true; // Make sure to set this flag to prevent re-execution
}



        });
    } catch (error) {
        console.error('Error fetching vegetables:', error);
    }
}

// Function to handle buying a vegetable
async function buyVegetable(vegetableId) {
    try {
        // GET request to fetch vegetable details by ID
        const response = await axios.get(proxyUrl+`https://crudcrud.com/api/e6055305aa744303b0fe3184ee2f3a9d/vegetables/${vegetableId}`);
        const vegetable = response.data;
        console.log(response.data);

        // Decrease quantity by 1
        vegetable.quantity--;
        console.log(vegetable.quantity);

        // PUT request to update vegetable details
        await axios.put(proxyUrl+`https://crudcrud.com/api/e6055305aa744303b0fe3184ee2f3a9d/vegetables/${vegetableId}`, vegetable);

        // Display updated vegetable details
        displayVegetables();
    } catch (error) {
        console.log('Error buying vegetable:', error.data);
    }
}

// Function to handle deleting a vegetable
async function deleteVegetable(vegetableId) {
    try {
        // DELETE request to delete vegetable
        await axios.delete(proxyUrl+`https://crudcrud.com/api/e6055305aa744303b0fe3184ee2f3a9d/vegetables/${vegetableId}`);

        // Display updated vegetable details
        displayVegetables();
    } catch (error) {
        console.error('Error deleting vegetable:', error);
    }
}

// Display initial vegetable details
document.addEventListener('DOMContentLoaded', () => {
    displayVegetables();});

// Add event listener to the form
document.getElementById('veggie-form').addEventListener('submit', addVegetable);
