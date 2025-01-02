Project Setup and Testing Guide
This guide will walk you through setting up the project and testing various transaction scenarios, including successful payments, failures, and 3D Secure authentication.

To get started with the project, follow these steps:

// FRONTEND & Backend 
1. Install Dependencies
   Run the following command to install the necessary dependencies: yarn install
2. Start Development Server
To start the project in development mode, run: yarn dev
3. Make sure to set up the .env file with the correct credentials for both frontend and backend services.

The frontend will run on port 5173, and the backend will run on port 3000.

Transaction Testing
Once the project is running, you can test various scenarios using the provided card numbers. Here’s how each one works:

1. Successful Transaction
   Card Number: 4242 4242 4242 4242
   CVC: Any valid 3-digit code (e.g., 123)
   Expiration Date: Any future date (e.g., 12/24)
   This card simulates a successful payment.

2. Transaction Declined (Failure)
   Card Number: 4000 0000 0000 9995
   CVC: Any valid 3-digit code (e.g., 123)
   Expiration Date: Any future date (e.g., 12/24)
   This card simulates a failed payment, and the transaction will be declined.

3. 3D Secure Authentication Required
   Card Number: 4000 0025 0000 3155
   CVC: Any valid 3-digit code (e.g., 123)
   Expiration Date: Any future date (e.g., 12/24)
   This card triggers 3D Secure (3DS) authentication, requiring additional steps to verify the payment. You may encounter a pop-up window or a redirect for further confirmation.

Notes
Ensure your environment is properly configured to simulate payments (test environment with a payment gateway like Stripe, for example).
Always use test credentials and cards in the sandbox mode to avoid real transactions.
Conclusion
With these steps, you should be able to set up the project and test various transaction scenarios. If you encounter any issues, make sure to check the server logs or the console for error details.
