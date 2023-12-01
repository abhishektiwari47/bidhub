import axios from 'axios';
import React, { useState } from 'react';
import { base_url } from '../../store/constants';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const handleFeedbackChange = (e:any) => {
    setFeedback(e.target.value);
  };

  const submitFeedback = async () => {
    const authorization = "Bearer " + localStorage.getItem('token');
    const body = { query: feedback };

    try {
      const response = await axios.post(
        `${base_url}/general/postQuery`,
        body,
        {
          headers: {
            Authorization: authorization
          },
        }
      );

      console.log(response.data);

      setFeedback('');

      if (response.status === 201) {
        alert("Your Feedback was sent!!");
        navigate(-1);
      } else if (response.status === 401) {
        alert("You are unauthorized for sending queries :(");
      } else {
        alert("There was some problem");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("There was an error submitting your feedback. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-800 to-indigo-800 h-screen text-white flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-gray-800">

        <h1 className="text-4xl font-bold mb-6">Contact Bidhub</h1>

        <p className="mb-6 text-lg">
          We appreciate your interest and are here to assist you. Feel free to reach out to us for any inquiries or feedback.
        </p>

        <div className="mb-4">
          <strong>Phone:</strong> +91 9568743367
        </div>

        <div className="mb-4">
          <strong>Email:</strong> abhitiwari3010@gmail.com
        </div>

        <div className="mb-4">
          <strong>Address:</strong> Raj Nagar Colony, Shahdara, Agra, 282006
        </div>

        <div className="mt-8">
          <label className="block mb-2 text-sm" htmlFor="feedback">Your Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={handleFeedbackChange}
            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Type your feedback here..."
          ></textarea>
        </div>

        <button
          onClick={submitFeedback}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default Contact;
