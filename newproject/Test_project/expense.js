
//import axios from "node/axios"


function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    const itemName = document.getElementById('itemname').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
  
    // Check if any field is empty
    if (!itemName || !description || !price) {
      window.alert('Please fill in all fields!');
      return;
    }
  
    
    const item = {
      itemName: itemName,
      description: description,
      price: price,
    };
  
    // Save item data to local storage
    saveItemToLocalStorage(item);
  
    // Clear the form after successful submission
    event.target.reset();
  
    // Update the displayed items
    displayItems();
  }
  
  // Function to save item data to local storage
  function saveItemToLocalStorage(item) {
    const existingItems = getItemsFromLocalStorage();
  
    // Convert item object to JSON string for storage
    const itemJSON = JSON.stringify(item);
  
    // Add the new item to existing items (or create an empty array if none exists)
    existingItems.push(itemJSON);
  
    // Store the updated items array back in local storage
    localStorage.setItem('retailItems', JSON.stringify(existingItems));
  }
  
  // Function to retrieve items from local storage
  function getItemsFromLocalStorage() {
    const storedItems = localStorage.getItem('retailItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }
  
  // Function to display items
  function displayItems() {
    const itemsContainer = document.getElementById('items-display');

    // Clear any existing items before displaying new ones
    if (itemsContainer) {
        itemsContainer.innerHTML = '';
    }

    const items = getItemsFromLocalStorage();

    console.log("Items from local storage:", items); // Check the items retrieved from local storage

    // Loop through each item and create elements for display
    items.forEach((itemJSON, index) => {
        try {
            const item = JSON.parse(itemJSON);

            const itemElement = document.createElement('div');
            itemElement.classList.add('item');

            
            itemElement.innerHTML = `
                <p>${item.itemName}
                 &nbsp  ${item.description}
                 &nbsp $${item.price}
                <button data-item-index="${index}" onclick="handleDeleteItem(this)">Delete</button>
                <button data-item-index="${index}" onclick="handleEditItem(this)">Edit</button>
                </p>
            `;
            console.log("Item element:", itemElement);

            itemsContainer.appendChild(itemElement);
        } catch (error) {
            console.error("Error processing item:", error);
        }
    });
}

  
  // Function to handle item deletion
  function handleDeleteItem(buttonElement) {
    const itemIndex = buttonElement.dataset.itemIndex;
    const items = getItemsFromLocalStorage();
  
    
    items.splice(itemIndex, 1);
  
    
    localStorage.setItem('retailItems', JSON.stringify(items));
  
    
    displayItems();
  }
  
  // Function to handle item edit
  function handleEditItem(buttonElement) {
    const itemIndex = buttonElement.dataset.itemIndex;
  const items = getItemsFromLocalStorage();

  // Access the item object for editing
  const itemToEdit = JSON.parse(items[itemIndex]);
    console.log(itemToEdit)
  // Prefill the input fields with the existing item data
  document.getElementById('itemname').value = itemToEdit.itemName;
  document.getElementById('description').value = itemToEdit.description;
  document.getElementById('price').value = itemToEdit.price;
  
    alert(`Editing item: ${itemToEdit.itemName}`);
  }
  

  