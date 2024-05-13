// Write your code below:
// Function to handle form submission


function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const item = document.getElementById("itemname").value;
    const desc = document.getElementById("description").value;
    const price= document.getElementById('price').value;
    const quant= document.getElementById('quantity').value;

    // Create user object
    const data = {
        item: item,
        desc: desc,
        price: price,
        quant: quant
    };
    axios.post('https://crudcrud.com/api/a9dc7f45d8944149865de5ca923b8414/project',data).then(
        response=>{
            console.log('Item Data saved successfully!!!',response.data);

            //clearing fields after posting
            document.getElementById("itemname").value="";
            document.getElementById("description").value="";
            document.getElementById('price').value="";
            document.getElementById('quantity').value="";

            
        }
    ).catch(error=>{
        console.log('Error in posting Data',error)
    })

}
    // Retrieve existing users from local storage or initialize an empty array
    function fetch()
    {
    axios.get('https://crudcrud.com/api/a9dc7f45d8944149865de5ca923b8414/project').then(
        response=>{
            const itemlist=response.data;
            const display=document.querySelector('ul');
            display.innerHTML="";

            itemlist.forEach(it=>{
                const listitem=document.createElement('li');
                listitem.textContent='Item:${item} Price:${price} Quanitity:${quant}';
                display.appendChild(listitem);
            })
        }
    ).catch(error=>{
        console.log('unable to fetch!!',error)
    })

    }

 document.querySelector('form').addEventListener("submit",handleFormSubmit);

 document.addEventListener('DOMContentLoaded',fetch);

 //module.exports = handleFormSubmit;