import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import { useGetCurrentUser, useGetUserById } from '@/lib/react-query/queriesAndMutations';

import  { useState } from 'react'
import { Link,  useParams } from 'react-router-dom'

const Profile = () => {
  
const {data:currentUser}=useGetCurrentUser();
  const {id}=useParams();

const {data:user,isFetching}=useGetUserById(id || '');
const [showWhat,setShowWhat]=useState('posts')
 if(isFetching)
 {
  return <Loader/>
 }
  let biolines=[]
  if(user?.bio)
  {
   biolines=user?.bio.split('.' || "/n");
  }
console.log(user)
  return (
    
    <div className="flex flex-1 flex-col mx-2 mt-9 overflow-scroll custom-scrollbar">
    <div className='flex flex-row gap-6 items-start' >
         
         <img src={user?.imageUrl} alt="userimage" className='w-24 h-24 rounded-full '/>
         <div className='flex flex-col'>
            <h2 className='h3-bold w-full'>{user?.name}</h2> 
           <p className='text-light-4 mt-2'>@{user?.username}</p>


          <div className='flex flex-row items-center mt-4'>
              <p className="text-purple-700 mx-3">{user?.posts.length}</p>
             <p className="text-lg"><strong>Posts</strong></p>

          </div>
 
          {biolines && (<ul className='mt-4 gap-2'>
            {biolines.map((line:string)=>(
             <li className='text-white'>{line}</li>
            ))}

          </ul>)}

         </div>

         {id==currentUser?.$id? (
          <Link to={`/update-profile/${id}`}>
          <Button className="shad-button_dark_4">Edit</Button>
         </Link>)
         : 
         (<div className='flex flex-row bg-dark-4 hover:bg-slate-800 rounded justify-around ml-5 w-20 h-9 cursor-pointer items-center'>
         <p className='text-light'>Follow</p>
         </div>)
}  
    </div>
 
      <div className="flex flex-row mt-7 gap-4">
          <button onClick={()=>setShowWhat('posts')}>
          <div className="flex flex-row rounded h-8 w-32  gap-2 items-center border border-slate-800 hover:bg-slate-800 ">
            <img src="/assets/icons/posts.svg" alt="posts" className='h-5 w-5 ml-4'/>
            <p className='text-white'>Posts</p>
          </div>
          </button>
        {id==currentUser?.$id  && <button onClick={()=>setShowWhat('liked')}>
          <div className="flex flex-row w-36 rounded items-center gap-2 border border-slate-800 hover:bg-slate-800">
          <img src="/assets/icons/liked.svg" alt="liked" className='h-5 w-5 ml-2' />
          <p className='text-white'>Liked Posts</p>
          </div>
          </button>}
        </div> 
        
       
         <div className="flex flex-wrap md:gap-6 lg:gap-6 w-full max-w-5xl mt-5 "> 
     {showWhat=='posts'?(<GridPostList posts={user?.posts} userName={user?.name} userImageUrl={user?.imageUrl} showStats={true} showUser={false}/>):(<GridPostList posts={user?.liked} showStats={false} showUser={true} userName={user?.name} userImageUrl={user?.imageUrl}/>)
     
    }


      </div>
     </div>



  )
}

export default Profile