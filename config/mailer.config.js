const user = process.env.NM_USER;

const transport = nodemailer.createTransport(
    {
        host: "smtp.ionos.es", 
        auth: {
            user: user,
            pass: process.env.NM_PASS
        }
    }
)

module.exports.sendValidationEmail = (email, activationToken, name) => {
    transport.sendMail({
		to: email,
        from: `Workspace Register <${user}>`,
        subject: 'Verifica tu dirección de email',
        html: `
        <div style="margin-left: 9em;">
            <img src="https://res.cloudinary.com/dbldxawid/image/upload/v1598465475/Kiui/Logo_Rosa_cgt1ws.png" alt="Kiui Black" width="100px" heigth="auto" style="margin: 10px 10px;">
            <h2>Verifica tu dirección de email</h2>
            <p>Hola ${name}</p>
            <p>Gracias por registrarse en Workspace</p>
            <p></p>
            <p>Para acceder a tu cuenta To get access to your account please verify your email address by clicking the link below.</p>
            <br><br>
            <a href="${host}/activate/${activationToken}" style="margin: 30px 30px; padding: 10px 20px; color: white; background-color: lightblue; border-radius: 5px;">Haz click aqui!</a>
            <br><br>
            <p>Un saludo,</br>
            The Kiui App Team</p>
        </div>
       `
   }, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     })
}