import { Models } from 'appwrite'
import { Link } from 'react-router-dom';

type userCardProps={
    user:Models.Document;
}


const UserCard = (user:userCardProps) => {
 
    return (

    <Link to={`/profile/${user.user.$id}`} className='cursor-pointer'>    
    <div className="bg-dark w-32 h-42 rounded flex flex-col items-center border border-dark-4 hover:bg-dark-4 p-4 mt-5">
 
         <img src={user.user.imageUrl} alt="" className='rounded-full h-16 w-16 mt-2'/>
        <p className='mt-2 text-xs '>{user.user.name}</p>
        <p className='mt-2 text-light-3 text-sm'>{user.user.username}</p>
       

    </div>
    </Link>
  )
}

export default UserCard