import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './form.css';

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log('Form data updated:', formData); // Log form data as it's updated
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted with data:', formData); // Log form data when form is submitted

    try {
      const response = await fetch('http://127.0.0.1:8000/api/api/create-user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status); // Log response status

      if (response.ok) {
        const data = await response.json();
        console.log('Form submitted successfully:', data); // Log response data on success
        setSubmissionStatus('success');
        navigate('/success'); // Redirect to the success pagex
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData); // Log error response
        setSubmissionStatus(errorData.detail || 'Error submitting form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error); // Log any error in the fetch process
      setSubmissionStatus('Error submitting form. Please try again.');
    }
  }

  return (
    <div className="modal-container">
      <h2>Profile Information</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {submissionStatus && submissionStatus !== 'success' && (
        <p className="error-message">{submissionStatus}</p>
      )}
    </div>
  );
}

export default FormPage;
