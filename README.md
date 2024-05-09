# echo_E2EE_Messaging_WebApp
Final Year University Project. An end-to-end encrypted messaging web application called Echo, it incorperates TOTP for login instead of the standard password.

This project shows how on device end-to-end encryption is possible for messaging applications, therefore improving trust for users.

To run this project:
- Download a local server application that supports a mySQL database such as XAMPP.
- Import the final.sql file into the database.
- Set up a user and alter the php files accordingly.
- Start the local hosting.
- Navigate to the hosted site.

Creating logins:
- By inputting a number and using an OTP application such as Microsoft Authenticator or Twillo Authy to scan the QR code and generate a OTP, this will create a user storing an encrypted version of the secret in the connected mySQL database.
