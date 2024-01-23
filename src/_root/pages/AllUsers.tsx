import Loader from '@/components/shared/Loader';
import UserCard from '@/components/shared/UserCard';
import { useUserContext } from '@/context/AuthContext';
import { useGetUsers } from '@/lib/react-query/queriesAndMutations'

const AllUsers = () => {
 const curruser=useUserContext();
 const {data:users,isFetching}=useGetUsers();
  if(isFetching)
  {
    return <Loader/>
  } 
 
 const userlist=users?.documents.filter((user)=>user.$id!==curruser.user.id)
console.log(userlist)

 return (
    <div className='flex flex-col mx-4 mt-4  items-start overflow-scroll custom-scrollbar'>
      <h2 className='h2-bold md:h3-bold'>All Users</h2>
      <ul className='flex flex-row justify-around my-3 gap-4'>
       {userlist?.map((user)=>(
        <UserCard user={user} />
       ))}  
     

      </ul>
  
    </div>
  )
}

export default AllUsers