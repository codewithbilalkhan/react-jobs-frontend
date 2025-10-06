import React from 'react'
import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import JobListings from '../components/JobListings'
import ViewAllJobs from '../components/ViewAllJobs'

const HomePage = () => {
  return (
    <div>
     
      <Hero 
        heading="Find Your Dream Job Today" 
        tagline="Empowering job seekers and employers to connect with ease."
      />
      <HomeCards />
      <JobListings isHome="true" />
      <ViewAllJobs />

    </div>
  )
}

export default HomePage
