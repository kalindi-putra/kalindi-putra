//import axios from 'axios'
async function addUser(event)
{
    event.preventDefault();

    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const pass=document.getElementById('password').value;
    try{

        const resp=await axios.post('http://18.232.215.9:3000/expense/adduser',
       { name,
        email,
        pass
    })

        alert(resp.data.message)

      //  displayExpense()

    }
    catch(e)
    {
        alert(e.response.data.message);
    }

    document.getElementById("Expense app").reset(); // Resets the form

}

document.getElementById('Expense app').addEventListener('submit', addUser);
