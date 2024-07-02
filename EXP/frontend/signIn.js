
async function SignIn(event)
{
    event.preventDefault();

    const pass=document.getElementById('password').value;
    const email=document.getElementById('email').value;
    try{

        const resp=await axios.post(`http://localhost:3000/expense/signInUser`,{
            email,
            pass
        })
        alert(resp.data.message)
      //  console.log('Token',resp.data.Token);

    localStorage.setItem('token',resp.data.Token)

   // checkPremium()

    window.location.href = `expenseTracker.html`;


    }
    catch(e)
    {
        alert(e.response.data.message);
        console.log(e.response);
    }


}




document.getElementById('Sign In').addEventListener('submit', SignIn);
//document.getElementById('').addEventListener('submit',buyPremium)