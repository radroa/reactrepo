import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import MainLayout from './layouts/MainLayout.jsx';
import JobsPage from './pages/JobsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import JobPage, { jobLoader } from './pages/JobPage.jsx';
import AddJobPage from './pages/AddJobPage.jsx';
import EditJobPage from './pages/EditJobPage.jsx';


const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return
  };

  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(job)
    });
    return
  };

  //Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE'
    });
    return
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/jobs' element={<JobsPage />} />
      <Route path='/add-job' element={<AddJobPage addJobSubmit = { addJob } />} />
      <Route path='/jobs/:id' element={<JobPage deleteJob = { deleteJob } />} loader={ jobLoader } />
      <Route path='/edit-job/:id' element={<EditJobPage updateJob = { updateJob } />} loader={ jobLoader } />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
    )
  );

  return <RouterProvider router={router} />
}

export default App