import HomePage from './pages/HomePage'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFound from './pages/NotFound';
import JobPage from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployerDashboard from './pages/EmployerDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { JobsProvider } from './contexts/JobsContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
const router  = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
     <Route index element={<HomePage/>}/>
      <Route path='/jobs' element={<JobsPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/employer-dashboard' element={<EmployerDashboard/>}/>
      <Route path='/add-job' element={<AddJobPage/>}/>
      <Route path='/jobs/:id' element={<JobPage/>}/>
      <Route path='/jobs/edit/:id' element={<EditJobPage/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Route>
   
  )
);
  return (
    <AuthProvider>
      <JobsProvider>
        <RouterProvider router={router}/>
        <ToastContainer />
      </JobsProvider>
    </AuthProvider>
  );
 
};

export default App
