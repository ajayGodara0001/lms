import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
        <div className="mb-4">
          <p><span className="font-semibold">Name:</span> Ajay</p>
          <p><span className="font-semibold">Email:</span> <a href="mailto:ajaygodara84557@gmail.com" className="text-blue-500">ajaygodara84557@gmail.com</a></p>
          <p><span className="font-semibold">Address:</span> Hisar, Haryana, India</p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <iframe
          className="w-full h-64 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13987.780065978002!2d75.70117117150147!3d29.153206230052868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3912322b8c18dfdd%3A0x2823f16232ab94c9!2sGuru%20Jambheshwar%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1711010403247!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
