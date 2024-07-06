async function Check_password(event)
{
    event.preventDefault();
    try{

     const email=document.getElementById('email').value;
     const res=await axios.post('http://18.232.215.9:3000/user/forgot-password',{ email })

        alert(res.data.message)
        console.log('Forgot password response >>',res);

    }
    

    catch(e)
    {
        alert(e.response.data.message)
        console.log('In the catch blog >>> ',e.response.data.message);
    }
}
document.getElementById('forgPass').addEventListener('submit', Check_password);

