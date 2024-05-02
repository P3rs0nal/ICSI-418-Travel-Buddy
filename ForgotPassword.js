import React, { useState } from 'react';

const ForgotPassword = () => {
  const [input, setInput] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPopupVisible(true); // Show the popup
    setTimeout(() => setPopupVisible(false), 3000); // Hide the popup after 3 seconds
  };

  return (
    <div>
      <h1>Recover Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter email associated with your account:
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Send Email</button>
      </form>
      {popupVisible && (
        <div>
          Email sent!
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;