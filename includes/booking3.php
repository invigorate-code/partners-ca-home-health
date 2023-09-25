<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

$secret = '6LenStUZAAAAAKS8QNLqiKwGKOniz_PYL_oacsIT';
$site_jey = '6LenStUZAAAAADFndFfBZsTzYmSJIwIrnpscPQ2f';
if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response']))
{
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
    $responseData = json_decode($verifyResponse);
    if($responseData->success)
    {
        // Instantiation and passing `true` enables exceptions
        $mail = new PHPMailer(true);

        $message_body = "
        <p> Hi, Admin ".$_POST['name']." wants to be connected with you. Below are the details.</p>
        <p>
            <b>Email</b><br>
            ".$_POST['email']."
        </p>
        <p>
            <b>Phone</b><br>
            ".$_POST['phone']."
        </p>
        <p>
            <b>Select Option</b><br>
            ".$_POST['select']."
        </p>
        <p>
            <b>Message</b><br>
            ".$_POST['message']."
        </p>
        ";

        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'yourGmailId@gmail.com';// use here your configuration gmail id with 2 step verification activated
            $mail->Password   = 'gmailAppPassword';//here will be your email one time password generate from google 
            //gto this link to create one time password https://myaccount.google.com/security
            $mail->SMTPSecure = 'tls';
            $mail->Port       = 587;

            //Recipients
            $mail->setFrom($_POST['email'], $_POST['name']);//no need to change in this line please keep as it is
            $mail->addAddress('YourReceivingMailId@gmail.com', 'Contact us'); //no need to change in this line please keep as it is
            $mail->addReplyTo('info@example.com', 'Information');

            // Content
            $mail->isHTML(true);
            $mail->Subject = $_POST['subject'];
            $mail->Body    = $message_body;
            $mail->AltBody = $message_body;

            $mail->send();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
        echo json_encode($responseData);
    }
}
?>