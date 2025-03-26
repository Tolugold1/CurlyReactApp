import React from 'react';

const ResumeCreation = () => {
  return (
    <div className="p-8">
      <div className="text-orange-500 mb-4">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg> Back
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2">Plans & Pricing</h2>
      <p className="text-gray-600 mb-8">Choose any of our pricing plans and proceed with job postings.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-slate-100 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">$30 <span className="text-sm text-gray-600">/ 1 job posting</span></h3>
          </div>
          <h4 className="text-lg font-semibold">Basic Plan</h4>
          <p className="text-gray-600 mb-4">Post a job and interview candidates for the role.</p>
          <ul className="list-disc ml-4 text-gray-600 mb-6">
            <li>1 job post</li>
            <li>In-app interview</li>
            <li>1 job match</li>
          </ul>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Choose plan</button>
        </div>

        <div className="bg-slate-100 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">$150 <span className="text-sm text-gray-600">/ 10 job postings</span></h3>
          </div>
          <h4 className="text-lg font-semibold">Silver Plan</h4>
          <p className="text-gray-600 mb-4">Take advantage of our discount on the basic plan when you buy up to 10 job postings.</p>
          <ul className="list-disc ml-4 text-gray-600 mb-6">
            <li>10 job postings</li>
            <li>In-app interview</li>
            <li>10 job matches</li>
          </ul>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Choose plan</button>
        </div>

        <div className="bg-indigo-600 p-6 rounded-lg shadow-md relative">
          <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs">MOST POPULAR</span>
          <div className="flex justify-between items-center mb-4 text-white">
            <h3 className="text-xl font-bold">$699 <span className="text-sm">/ Unlimited Jobs for 1 year</span></h3>
          </div>
          <h4 className="text-lg font-semibold text-white">Premium Plan</h4>
          <p className="text-white mb-4">Get unlimited job posting and job matches for a year.</p>
          <ul className="list-disc ml-4 text-white mb-6">
            <li>Multi-step Drop</li>
            <li>Unlimited Premium</li>
            <li>Unlimited Users Team</li>
            <li>Advanced admin</li>
            <li>Custom Data Retrievals</li>
          </ul>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">Choose plan</button>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <input className="border border-gray-300 rounded px-4 py-2" placeholder="Coupon Code here" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg ml-4 hover:bg-indigo-700">Redeem</button>
      </div>
    </div>
  );
};

export default ResumeCreation;
