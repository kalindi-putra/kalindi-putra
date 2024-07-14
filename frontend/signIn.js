
async function SignIn(event)
{
    event.preventDefault();

    const pass=document.getElementById('password').value;
    const email=document.getElementById('email').value;
    try{

        const resp=await axios.post(`http://18.232.215.9:3000/expense/signInUser`,{
            email,
            pass
        })
        alert(resp.data.message)

    localStorage.setItem('token',resp.data.Token)


    window.location.href = `expenseTracker.html`;


    }
    catch(e)
    {
        alert("Some error occured , please try in sometime");
    }
    document.getElementById("Sign In").reset(); // Resets the form


}




document.getElementById('Sign In').addEventListener('submit', SignIn);
//document.getElementById('').addEventListener('submit',buyPremium)