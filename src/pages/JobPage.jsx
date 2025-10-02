import React from 'react'
import {useState, useEffect} from 'react'
import Spinner from '../components/Spinner';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import {FaMapMarker} from 'react-icons/fa'
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from '../contexts/AuthContext';


const JobPage = ({deletejob}) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const OnDeleteClick = async (jobID) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this job?");
        if(!isConfirmed)
        return; 
        
        try {
            await deletejob(jobID);
            toast.success("Job deleted successfully!");
            navigate('/jobs');
        } catch (error) {
            toast.error("Failed to delete job. Please try again.");
        }
    }
   const {id} = useParams();
   const[job, setJob] = useState(null);
   const [loading, setloading] = useState(true)
    useEffect(() =>{
    const fetchJobs = async () => {
       try{ 
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        console.log(data);
        setJob(data);
    
    }catch(error)
    {
        console.log("Error fetching jobs:", error);
    }finally{
        setloading(false);
    }
    }
    fetchJobs();
 }, [id]);


return loading ? <Spinner loading={loading}/> : (
  job ? <>

    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          to="/jobs"
          className="text-indigo-500 hover:text-indigo-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Job Listings
        </Link>
      </div>
    </section>

    <section className="bg-indigo-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-6">
          <main className="lg:col-span-2">
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div className="text-gray-500 mb-4">{job.type}</div>
              <h1 className="text-3xl font-bold mb-4">
                {job.title}
              </h1>
              <div
                className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <FaMapMarker className="text-orange-700 inline text-lg mb-1 mr-1" />
                <p className="text-orange-700">{job.location}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-indigo-800 text-lg font-bold mb-6">
                Job Description
              </h3>

              <p className="mb-4">
               {job.description}
              </p>

              <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

              <p className="mb-4">{job.salary} / Year</p>
            </div>
          </main>

          {/* <!-- Sidebar --> */}
          <aside className="lg:col-span-1">
            {/* <!-- Company Info --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Company Info</h3>

              <h2 className="text-2xl">{job.company.name}</h2>

              <p className="my-2">
                {job.company.description}
              </p>

              <hr className="my-4" />

              <h3 className="text-xl">Contact Email:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">
                {job.company.contactEmail}
              </p>

              <h3 className="text-xl">Contact Phone:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">{job.company.contactPhone}</p>
            </div>

            {/* <!-- Manage --> Only show for employers */}
            {user && user.role === 'employer' && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/jobs/edit/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  >Edit Job
                  </Link>
                <button  onClick={()=>OnDeleteClick(job.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  </> : <div>Job not found</div>
);
};

export default JobPage
