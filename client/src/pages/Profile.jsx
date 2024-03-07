import React, { useEffect, useState } from 'react'
import ProfileDetail from '../component/Profile/ProfileDetail'
import Loading from '../component/Loading'
import { useAuth } from './Auth';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const auth = useAuth(); // Accessing authentication state and functions
  const navigate = useNavigate(); // Hook for navigation

  const [profileData, setProfileData] = useState(null); // State for profile data

  useEffect(() => {
    // Fetching user profile data from the server
    fetch('http://localhost:4000/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        //handle Error here
      }
      return response.json();
    })
    .then(data => {
      // Setting profile data state after successful fetch
      setProfileData(data);
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        auth.logout();
        navigate("/login");
      }
      
    });
  }, [auth,navigate]);// Dependency array including auth and navigate to prevent infinite loop

  if (!profileData) {
    return <div><Loading/></div>; // Rendering loading component while profile data is being fetched
  }
  // Rendering profile detail component after profile data is available
  return (
    <div className='flex justify-center'>{profileData&&<ProfileDetail profileData={profileData} />}</div>
  )
}

export default Profile