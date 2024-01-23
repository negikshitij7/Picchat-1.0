import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader';
import { useUserContext } from '@/context/AuthContext';
import { useGetSavedPosts } from '@/lib/react-query/queriesAndMutations';


const Saved = () => {
  const {user}=useUserContext();
  console.log(user)
  const {data:savedDoc,isFetching}=useGetSavedPosts(user.id); 
  if(!savedDoc && isFetching)
  {
    return <Loader/>
  }
  const posts=savedDoc?.documents.map((savedPost)=>(savedPost.post))
  console.log(posts)
  return (
    <div className='saved-container'>

      
      <h2 className='h2-bold md:h3-bold w-full'>Your Saves</h2>
      <div className="flex flex-wrap gap-9 w-full">
     {posts && <GridPostList posts={posts}  showStats={true} showUser={true}/> }
     </div>
    </div>
  )
}

export default Saved