import React from 'react';
import JobListing from './JobListing'
import Spinner from './Spinner'
import { useJobs } from '../contexts/JobsContext';


const JobListings = ({isHome = false}) => {
  const { jobs, loading } = useJobs();

  return (
      <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
        {isHome ? 'Recent Jobs': 'Browse Jobs'}
        </h2>
        
        {loading ? (
          <Spinner loading={loading} />
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(jobs) && (isHome ? jobs.slice(0, 3) : jobs).map((job) => (
            <JobListing key={job.id} job={job} />
          ))}
           </div>
        )}
       
      </div>
    </section>
  )
}

export default JobListings
