//import axios from 'axios'
async function addUser(event)
{
    event.preventDefault();

    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const pass=document.getElementById('password').value;
    try{

        const resp=await axios.post('http://localhost:3000/expense/adduser',
       { name,
        email,
        pass
    })

        alert(resp.data.message)
        console.log(resp.data);

      //  displayExpense()

    }
    catch(e)
    {
        alert(e.response.data.message);
        console.log(e);
    }
}
document.getElementById('Expense app').addEventListener('submit', addUser);
