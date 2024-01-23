import { useUserContext } from '@/context/AuthContext';
import { multiFormatDateString } from '@/lib/utils';
import { Models } from 'appwrite'

import { Link } from 'react-router-dom';
import PostStats from './PostStats';

type PostCardProps={
    post:Models.Document;
}

const PostCard = ({post}:PostCardProps) => {

 const {user}=useUserContext();

 if(!post.user) return;


  return (
    <div className='post-card'>
     <div className='flex-between'>
       <div className='flex items-center gap-3'>
          <Link to={`/profile/${post.user.$id}`}>
            <img src={post?.user?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="creator" className="rounded-full w-12 lg:hg"/>
          </Link>
          <div className="flex flex-col">
            <p className='base-medium lg:body-bold text-light-1'>
                {post.user.name}
            </p>
             <div className="flex-center gap-2 text-light-3">
               <p className='subtle-semibold lg:small-regular'>

                {multiFormatDateString(post.$createdAt)}
               </p>
                -
                <p className='subtle-semibold lg:small-regular'>
                  {post.Location}
                </p> 
             </div>
            </div>          
       </div>
       <Link to={`/update-post/${post.$id}`} className={`${user.id !== post.user.$id && "hidden"}`}>
         <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
       </Link>
    
     </div>

     <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
           <p>{post.Caption}</p>
           <ul className='flex gap-1 mt-2'>
              {post.Tags.map((tag:string)=>(
                  <li key={tag} className='text-light-3'>#{tag}</li>
              ))}
           </ul>
        </div>
        
        <img src={post.Image_url || '/assets/icons/profile-placeholder.svg'} className='post-card_img ' alt="post image"/>

     </Link>

     <PostStats post={post} userId={user.id}/>
    </div>
  )
}

export default PostCard