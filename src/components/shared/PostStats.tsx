import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react-query/queriesAndMutations'
import { checkIsLiked } from '@/lib/utils'
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'

import Loader from './Loader'

type PostStatsProps={
    post?:Models.Document,
    userId:string
}

const PostStats = ({post,userId}:PostStatsProps) => {

 const {mutate:likePost}=useLikePost()
 const {mutate:savePost,isLoading:isSavingPost}=useSavePost()
 const {mutate:deleteSavedPost,isLoading:isDeletingPost}=useDeleteSavedPost()
 const {data:currentUser}=useGetCurrentUser(); 


const likesList=post?.likes.map((users:Models.Document)=>users.$id)

const [likes,setLikes]=useState(likesList);
const [isSaved,setIsSaved]=useState(false);

const savedPostRecord=currentUser?.save.find((record:Models.Document)=>record.post.$id === post?.$id)

useEffect(()=>{
 setIsSaved(!!savedPostRecord)
},[currentUser])


const handleLikes=(e: React.MouseEvent)=>{
    try {
         e.stopPropagation();

        let newlikes=[...likes];
        // if already liked then dislike else like
        if(newlikes.includes(userId))
        {
            newlikes=newlikes.filter((id)=>id !== userId)
        }
        else{
            newlikes.push(userId)
        }
 
       setLikes(newlikes)

       // new change the database to include the new likes list in the post

       likePost({postId:post?.$id || '',likesArray:newlikes})

    } catch (error) {
        console.log(error)
    }
}

const handleSave=(e: React.MouseEvent)=>{
 
   e.stopPropagation()
 
  if(isSaved)
  { 
    deleteSavedPost(savedPostRecord.$id)
    setIsSaved(false)
  }
  else{
    savePost({postId:post?.$id || '',userId:userId})
    setIsSaved(true)
    
  }

}

  return (
    <div className="flex justify-between items-center z-20">
        <div className="flex gap-2 mr-5">
          {currentUser &&
           <img src={checkIsLiked(likes,currentUser.$id)?("/assets/icons/liked.svg"):("/assets/icons/like.svg")} 
           alt="" height={20} width={20} 
            className='cursor-pointer'
            onClick={handleLikes}
           />}
            <p className='small-medium lg:base-medium'>{likes.length}</p>
        </div>
        <div className="flex gap-2 ">
           {isSavingPost || isDeletingPost?<Loader/>:<img src={isSaved?("/assets/icons/saved.svg"):("/assets/icons/save.svg")} 
           
           alt="" height={20} width={20} 
            className='cursor-pointer'
            onClick={handleSave}
           />}
          
        </div>

    </div>
  )
}

export default PostStats