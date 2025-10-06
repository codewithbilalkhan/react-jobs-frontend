import {Link} from 'react-router-dom'
import Cards from './Cards.jsx'
import { useAuth } from '../contexts/AuthContext'

const HomeCards = () => {
  const { user } = useAuth();
  
  return (
   <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid  grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Cards>
             <h2 className="text-2xl font-bold">For Job seekers</h2>
            <p className="mt-2 mb-4">
             Browse Jobs now and kick start your career
            </p>
            <Link
              to="/jobs"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Jobs
            </Link>
        
          </Cards>
          
          {/* Only show "For Employers" section if user is not a job seeker or is not logged in */}
          {(!user || user.role !== 'jobseeker') && (
            <Cards bg="bg-gray-100">
              <h2 className="text-2xl font-bold">For Employers</h2>
              <p className="mt-2 mb-4">
                List your job to find the perfect candidate for the role
              </p>
              <Link
                to="/add-job"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                Add Job
              </Link>
           
            </Cards>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomeCards
