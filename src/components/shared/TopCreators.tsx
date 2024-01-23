import { useGetUsers } from '@/lib/react-query/queriesAndMutations'

import Loader from './Loader';
import UserCard from './UserCard';

const TopCreators = () => {

    const {data:users,isFetching}=useGetUsers();
  
    
    if(!users && isFetching)
    {
        <Loader/>
    }

  return (
     <div className='hidden md:flex flex-col gap-3 items-center min-w-[100px] lg:min-w-[360px] overflow-scroll custom-scrollbar '>
         <h2 className='h3-bold'>Top Creators</h2>
           <ul className='flex flex-col gap-3 lg:flex-row lg:justify-between lg:gap-8 '>
           {users?.documents.map((user)=>(

            <UserCard user={user} key={user.$id}/>
           )
                
           )}
           </ul>
     </div>
  )
}

export default TopCreators