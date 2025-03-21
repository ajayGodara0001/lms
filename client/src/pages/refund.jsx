import React from 'react';

const Refund = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Refund Policy</h1>
      <p className="text-gray-700 mb-4">
        We are ready to give you the best. We understand that sometimes plans change. If you can no longer make it to the class, please email us in advance at 
        <a href="mailto:helpmission1success@gmail.com" className="text-blue-500 underline">helpmission1success@gmail.com</a>. Refunds will be made as per the policies mentioned below. 
        We strive to maintain the highest standards of quality and as with everything we do at Mission1Success, you get a 100% Satisfaction Guarantee.
      </p>

      {/* Policy A */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">Policy A</h2>
      <p className="text-gray-600 mb-2">Policy A applies to all Mission1Success courses under the categories of Digital Marketing, Data Science, and Python.</p>
      
      <h3 className="font-semibold text-gray-700">Cancellations Prior to the Course</h3>
      <p className="mb-4">If you are unable to attend the course and want a refund before the course commencement date, we will refund the full amount to you.</p>

      <h3 className="font-semibold text-gray-700">Withdrawals During the Course</h3>
      <p className="mb-4">If you withdraw within the first 2 classes, we will provide a 100% refund. However, no refunds are applicable after attending more than 2 classes.</p>

      <h3 className="font-semibold text-gray-700">Transfers to Another Batch</h3>
      <p className="mb-4">You can change your batch before the course begins or shift to a different batch of the same course at no additional cost.</p>

      {/* Policy B */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">Policy B</h2>
      <p className="text-gray-600 mb-2">Policy B applies to all Self-Paced Programs (E-Learning Programs) of Mission1Success.</p>

      <h3 className="font-semibold text-gray-700">Cancellations and Extensions</h3>
      <p className="mb-4">You may request to extend access to an e-learning program by one month by contacting us at <a href="mailto:helpmission1success@gmail.com" className="text-blue-500 underline">helpmission1success@gmail.com</a>. Further extensions will require a 50% payment of the course price.</p>

      {/* Additional Notes */}
      <h2 className="text-xl font-semibold text-gray-800 mt-6">Additional Notes</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>All refund or rescheduling requests must be sent via email.</li>
        <li>You are not eligible for refunds if you have accessed or downloaded the course material.</li>
        <li>Refunds will be processed within 10-15 business days.</li>
        <li>Refunds are not applicable for non-attendance.</li>
        <li>Mission1Success reserves the right to cancel or reschedule a course if necessary.</li>
      </ul>
    </div>
  );
};

export default Refund;
