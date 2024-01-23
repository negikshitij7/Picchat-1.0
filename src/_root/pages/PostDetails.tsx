import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';

import { toast } from '@/components/ui/use-toast';
import { useUserContext } from '@/context/AuthContext';
import { useDeletePost, useGetPostById, useGetUserById } from '@/lib/react-query/queriesAndMutations';
import {  multiFormatDateString } from '@/lib/utils';
import { Models } from 'appwrite';
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const PostDetails = () => {
  const { id } = useParams();

  const { data: post, isLoading: isLoadingDetails } = useGetPostById(id || '');
  const { data: userOfPost, isLoading: isLoadingUser } = useGetUserById(post?.user.$id || '');
  const {user}=useUserContext();
  const {mutateAsync:deletePost}=useDeletePost();
  const navigate=useNavigate()

 

  const handleDeletePost=(e:React.MouseEvent)=>{
    e.stopPropagation()
    
    if(post)
    {
      console.log(post.imageId)
      console.log(post.$id)
    deletePost({
      postId:post.$id,
      imageId:post.imageId
    }
    )
    toast({title:"Post Deleted"})
    }
   
    
    return navigate(`/profile/${user.id}`)
 
  }

  if(isLoadingUser)
  {
    return <Loader/>
  }
  const postsOfUser=userOfPost?.posts.filter((apost:Models.Document)=>apost.$id!==post?.$id)
  console.log(postsOfUser)   
  return (
    <div className='post_details-container'>
      {isLoadingDetails ? (<Loader />) : (
        <div className='post_details-card'>
          <img src={post?.Image_url} alt="post" className='post_details-img' />
            
          <div className="post_details-info">

            <div className="flex-between w-full">


         
            
              <Link to={`/profile/${post?.user.$id}`} className='flex gap-3 items-center'>
                <img src={post?.user?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="creator" className="rounded-full w-8 h-8 lg:w-12 lg:h-12" />
             
              <div className="flex flex-col">
                <p className='base-medium lg:body-bold text-light-1'>
                  {post?.user.name}
                </p>
                <div className="flex-center gap-2 text-light-3">
                  <p className='subtle-semibold lg:small-regular'>

                    {multiFormatDateString(post?.$createdAt)}
                  </p>
                  -
                  <p className='subtle-semibold lg:small-regular'>
                    {post?.Location}
                  </p>
                </div>
              </div>
              </Link>
               
             <div className="flex-center ">
               <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.user.$id && 'hidden'}`}>
                  <img src="/assets/icons/edit.svg" alt="edit" width={24} height={24} />
               </Link>

               <Button
                onClick={handleDeletePost}
                variant="ghost"
                className={`ghost_details-delete_btn ${user.id !== post?.user.$id && "hidden"}`}
               >
                  <img src="/assets/icons/delete.svg" alt="delete" width={24} height={24}/>         
               </Button>
             </div>

            </div>
            <hr className='border w-full border-dark-4/80/'/>

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
           <p>{post?.Caption}</p>
           <ul className='flex gap-1 mt-2'>
              {post?.Tags.map((tag:string)=>(
                  <li key={tag} className='text-light-3'>#{tag}</li>
              ))}
           </ul>
        </div>

         <div className="w-full">
          <PostStats post={post} userId={user.id}/>
         </div>

        
          </div>          
         </div>
      )
      }
    
     
     <h2 className={`h3-bold md:h2-bold ${postsOfUser.length==0 && 'hidden'}`}>Related Posts</h2> 
      
     <GridPostList posts={postsOfUser} userName={userOfPost?.name} userImageUrl={userOfPost?.imageUrl} showStats={true} showUser={true}/>
      
    </div>
  )
}

export default PostDetails