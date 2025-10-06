import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockJobs } from '../data/mockJobs';

const JobsContext = createContext();

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load jobs on mount
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/jobs');
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('API Response:', data);
      
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error('API did not return an array:', data);
        setJobs(mockJobs);
      }
    } catch (error) {
      console.log("Error fetching jobs:", error);
      console.log("Using mock data instead");
      setJobs(mockJobs);
    } finally {
      setLoading(false);
    }
  };

  const addJob = async (newJob) => {
    try {
      const res = await fetch('http://localhost:8000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('authToken') && { 
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
          })
        },
        body: JSON.stringify(newJob)
      });
      
      if (!res.ok) {
        throw new Error('Failed to add job');
      }
      
      // Reload jobs from server
      await loadJobs();
    } catch (error) {
      console.error('Error adding job to backend, using local state:', error);
      
      // Fallback: Add to local state
      const jobWithId = {
        ...newJob,
        id: (Math.max(...jobs.map(j => parseInt(j.id) || 0), 0) + 1).toString()
      };
      
      setJobs(prevJobs => [...prevJobs, jobWithId]);
    }
  };

  const updateJob = async (id, updatedJob) => {
    try {
      const res = await fetch(`http://localhost:8000/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('authToken') && { 
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
          })
        },
        body: JSON.stringify(updatedJob)
      });
      
      if (!res.ok) {
        throw new Error('Failed to update job');
      }
      
      // Reload jobs from server
      await loadJobs();
    } catch (error) {
      console.error('Error updating job, using local state:', error);
      
      // Fallback: Update in local state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === id ? { ...updatedJob, id } : job
        )
      );
    }
  };

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          ...(localStorage.getItem('authToken') && { 
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
          })
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete job');
      }
      
      // Reload jobs from server
      await loadJobs();
    } catch (error) {
      console.error('Error deleting job, using local state:', error);
      
      // Fallback: Remove from local state
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    }
  };

  const getJobById = (id) => {
    return jobs.find(job => job.id === id);
  };

  const value = {
    jobs,
    loading,
    addJob,
    updateJob,
    deleteJob,
    getJobById,
    refreshJobs: loadJobs
  };

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  );
};

export default JobsContext;