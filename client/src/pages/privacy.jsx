import React from 'react';

const Privacy = () => {
  return (
    <div className="p-6 bg-gray-50 text-gray-800 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        LMS operates the <a href="https://lmsedu.vercel.app/" className="text-blue-600 underline">https://lmsedu.vercel.app/</a> website (Learning and Skilling).
      </p>
      <p className="mb-4">
        This page informs you of our policies regarding the collection, use, and disclosure of Personal Information when you use our Service.
      </p>
      <p className="mb-4">
        We will not use or share your information with anyone except as described in this Privacy Policy.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6">Information Collection And Use</h2>
      <p className="mb-4">
        We may ask you to provide certain personally identifiable information such as your email address, name, phone number, and postal address.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6">Cookies</h2>
      <p className="mb-4">
        We use cookies to improve our services. You can choose to disable cookies via your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services like Google Analytics for analytics and tracking purposes. Please refer to their privacy policies for more information.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@lmsedu.vercel.app" className="text-blue-600 underline">support@lmsedu.vercel.app</a>.
      </p>
    </div>
  );
};

export default Privacy;
