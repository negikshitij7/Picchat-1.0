import ProfileForm from '@/components/form/ProfileForm';
import { useGetUserById } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite'
import { Loader } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom'

const UpdateProfile = () => {
 const {id}=useParams();

 const {data:user,isFetching}=useGetUserById(id || '')

 if(isFetching)
 {
  return <Loader/>
 } 
 
  return (
    <div className='flex flex-1'>
    <div className="common-container">
     <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
       
       <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Profile</h2>

     </div>
      <ProfileForm user={user}/>
    </div>
     </div>
  )
}

export default UpdateProfile