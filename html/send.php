<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "aitorgarcia560@gmail.com"; // TU CORREO
    $subject = "Nuevo mensaje desde FontsPage";

    $body = "
    Nombre: $name\n
    Email: $email\n
    Mensaje:\n$message
    ";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
