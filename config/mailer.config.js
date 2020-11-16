const nodemailer = require('nodemailer');
const user = process.env.NM_USER;
const host = process.env.HOST || 'http://localhost:3000';


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
        from: `You work Register <${user}>`,
        subject: 'Verifica tu dirección de email',
        html: `
        <div style="margin-left: 9em;">
            <img src="https://res.cloudinary.com/dpzqosy5b/image/upload/v1605524326/final-project-Ironhack/free_horizontal_on_white_by_logaster_iisa6q.png" alt="You work!" width="100px" heigth="auto" style="margin: 10px 10px;">
            <h2>Verifica tu dirección de email</h2>
            <p>Hola ${name}</p>
            <p>Gracias por registrarse en You work</p>
            <p></p>
            <p>Para acceder a tu cuenta verifica tu email a traves del siguiente enlace.</p>
            <br><br>
            <a href="${host}/activate/${activationToken}" style="margin: 30px 30px; padding: 10px 20px; color: white; background-color: lightblue; border-radius: 5px;">Haz click aqui!</a>
            <br><br>
            <p>Un saludo,</br>
            Equipo de You work</p>
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