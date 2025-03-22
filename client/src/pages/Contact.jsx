import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
        <div className="mb-4">
          <p><span className="font-semibold">Name:</span> Ajay</p>
          <p><span  className="font-semibold">Phone:</span>+91 8168584557</p>
          <p><span className="font-semibold">Email:</span> <a href="mailto:ajaygodara84557@gmail.com" className="text-blue-500">ajaygodara84557@gmail.com</a></p>
          <p><span className="font-semibold">Address:</span>Guru Jambheshwar University of Science and Technology, Hisar, Haryana 125001</p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.366292038018!2d75.7014153153841!3d29.14988898215393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39123d9b8b3d4a9d%3A0x8f1c5c5b5b5b5b5b!2sGuru%20Jambheshwar%20University%20of%20Science%20and%20Technology%2C%20Hisar!5e0!3m2!1sen!2sin!4v1696861234567!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
            ></iframe>
      </div>
    </div>
  );
};

export default Contact;
