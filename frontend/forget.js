async function Check_password(event)
{
    event.preventDefault();
    try{

     const email=document.getElementById('email').value;
     const res=await axios.post('http://localhost:8000/user/forgot-password',{ email })

        alert(res.data.message)

    }
    

    catch(e)
    {
        alert(e.response.data.message)
    }
}
document.getElementById('forgPass').addEventListener('submit', Check_password);

