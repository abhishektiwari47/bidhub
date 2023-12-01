import React from 'react';

function Service() {
  return (
    <div className="bg-gradient-to-br from-blue-800 to-indigo-800 min-h-screen py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">

        <h1 className="text-4xl font-bold mb-6 text-gray-800">Terms of Service</h1>

        <div className="text-gray-700">

          <p className="mb-4">
            <strong>1. Acceptance of Terms</strong>
            <br />
            By accessing or using the services provided by Bidhub, you agree to be bound by the following Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
          </p>

          <p className="mb-4">
            <strong>2. User Accounts</strong>
            <br />
            a. You may need to create an account to use certain features of our services. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            <br />
            b. You must provide accurate and complete information when creating an account.
          </p>

          <p className="mb-4">
            <strong>3. Use of Services</strong>
            <br />
            a. You agree to use our services only for lawful purposes and in accordance with these terms.
            <br />
            b. You may not use our services in any way that could harm, disable, overburden, or impair our servers or networks.
          </p>

          <p className="mb-4">
            <strong>4. Refund Policy</strong>
            <br />
            a. We strive to provide a satisfactory experience to our users. If you are not satisfied with our services, you may be eligible for a refund based on our Refund Policy.
            <br />
            b. In the event of a canceled purchase, Bidhub is committed to ensuring customer satisfaction. We will promptly refund the entire amount to your Bidhub wallet, providing a seamless and efficient resolution to enhance your overall shopping experience.
            <br />
            c. Refunds will be processed in accordance with our Refund Policy.
          </p>

          {/* Add other sections based on your Terms of Service content */}

          <p className="mb-4">
            <strong>5. Changes to Terms</strong>
            <br />
            Bidhub reserves the right to update or modify these terms at any time without prior notice. Your continued use of our services after any such changes constitutes your acceptance of the new terms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Service;
