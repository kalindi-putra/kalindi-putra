const Sib=require('sib-api-v3-sdk')
const key=require('../../util/keys')
const user=require('../../model/user')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


async function sendPassMail(url,userId)
{

    try{

const client=Sib.ApiClient.instance

const apiKey=client.authentications['api-key']
apiKey.apiKey=key.SMTP_KEY

const tranMail=new Sib.TransactionalEmailsApi()

const sender={
    email:'nikhiljoshi1609@gmail.com'
}

const rec_id=await user.findOne({
    attributes:['email'],

    where:{
        userId:userId
    }
})

console.log(rec_id,'\n\n');

const reciever=[
    {
        email: rec_id.email
    }
]
const res= await tranMail.sendTransacEmail(
    {
        sender,
        to:reciever,
        subject:"This is test mail",
        htmlContent:`<a href="${url}"> Reset Your Password </a>`

    }
)
        console.log(res);

        return res

    }
catch(e)
{
    console.log(e);

    return e
}

}

module.exports={
    sendPassMail
}