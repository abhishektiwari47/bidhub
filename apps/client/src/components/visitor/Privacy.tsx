

function Privacy() {
  return (
    <div className="bg-gradient-to-br from-blue-800 to-indigo-800 min-h-screen py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">

        <h1 className="text-4xl font-bold mb-6 text-gray-800">Privacy Policy</h1>

        <div className="text-gray-700">

          <p className="mb-4">
            <strong>1. Information Collection</strong>
            <br />
            Bidhub collects and processes personal information when you use our services. This may include information provided when creating an account, making a purchase, or contacting customer support.
          </p>

          <p className="mb-4">
            <strong>2. Use of Information</strong>
            <br />
            Bidhub uses collected information for purposes such as order processing, personalized user experiences, and communication about products and services.
          </p>

          <p className="mb-4">
            <strong>3. Data Security</strong>
            <br />
            Bidhub implements security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure.
          </p>

          <p className="mb-4">
            <strong>4. Cookies</strong>
            <br />
            Bidhub uses cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings.
          </p>

          {/* Add other sections based on your Privacy Policy content */}

          <p className="mb-4">
            <strong>5. Changes to Privacy Policy</strong>
            <br />
            Bidhub reserves the right to update or modify this Privacy Policy at any time without prior notice. We encourage you to review this policy periodically for any changes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
