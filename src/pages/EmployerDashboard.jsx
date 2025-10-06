import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import JobListings from '../components/JobListings';

const EmployerDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Welcome Section */}
      <section className="bg-orange-700 py-20 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Welcome back, {user?.name}!
            </h1>
            <p className="my-4 text-xl text-white">
              Manage your job postings and find the perfect candidates
            </p>
            <Link
              to="/add-job"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Post New Job
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-4">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Post a Job</h2>
              <p className="mt-2 mb-4">
                Create a new job posting to attract top talent
              </p>
              <Link
                to="/add-job"
                className="inline-block bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600"
              >
                Add Job
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Manage Jobs</h2>
              <p className="mt-2 mb-4">
                Edit, update, or delete your existing job postings
              </p>
              <Link
                to="/jobs"
                className="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
              >
                View Jobs
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Analytics</h2>
              <p className="mt-2 mb-4">
                View insights about your job postings (Coming Soon)
              </p>
              <button
                className="inline-block bg-gray-400 text-white rounded-lg px-4 py-2 cursor-not-allowed"
                disabled
              >
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <JobListings isHome={false} />
    </div>
  );
};

export default EmployerDashboard;