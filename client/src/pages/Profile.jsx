import React, { useEffect, useState } from 'react'
import ProfileDetail from '../component/Profile/ProfileDetail'
import Loading from '../component/Loading'
import { useAuth } from './Auth';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      return response.json();
    })
    .then(data => {
      setProfileData(data);
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        auth.logout();
        navigate("/login");
      }
      setError(error.message);
    });
  }, [auth,navigate]);

  if (!profileData) {
    return <div><Loading/></div>;
  }
  console.log(profileData)
  return (
    <div className='flex justify-center'>{profileData&&<ProfileDetail profileData={profileData} />}</div>
  )
}

export default Profile