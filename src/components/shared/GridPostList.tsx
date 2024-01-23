import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'

type GridPostListProps={
    posts?:Models.Document[]
    showUser?:boolean,
    showStats?:boolean,
    userName?:string,
    userImageUrl?:string
}

const GridPostList = ({posts,showUser,showStats,userName,userImageUrl}: GridPostListProps) => {
 
 
 
    return (
    <ul className='grid-container'>
        {
            posts?.map((post)=>{
                return <li key={post.$id} className='relative min-w-80 h-80 '>
                    <Link to={`/posts/${post.$id}`} className='grid-post_link'>
                    <img src={post.Image_url} alt="postimage" className='h-full w-full object-cover'/>
                    </Link>

                    <div className="grid-post_user">
                    {showUser && post.user?(

                      
                       <div className="flex justify-start items-center gap-2 flex-1">
                        <img src={post.user.imageUrl} alt="creator" className='rounded-full h-8 w-8'/>
                        <p className='line-clamp-1'>{post.user.name}</p> 
                       </div>    
                       
                      
                    ):showUser?(
                        
                       <div className="flex justify-start items-center gap-2 flex-1">
                       <img src={userImageUrl} alt="creator" className='rounded-full h-8 w-8'/>
                       <p className='line-clamp-1'>{userName}</p> 
                      </div>    
                    ):(<div></div>)} 
                    {showStats && <PostStats post={post} userId={post.user?.$id}/>}   
                    </div> 
                    </li>
            })
        }

    </ul>
  )
}

export default GridPostList