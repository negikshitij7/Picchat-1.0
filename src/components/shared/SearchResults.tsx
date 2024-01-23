// import { Models } from 'appwrite';
import Loader from './Loader';
import GridPostList from './GridPostList';

type searchResultProps={
    isSearchFetching:boolean;
    searchedPosts?:any;
}

const SearchResults = ({isSearchFetching,searchedPosts}:searchResultProps) => {
   if(isSearchFetching) return <Loader/>
   
   console.log(searchedPosts)
   if(searchedPosts && searchedPosts.documents.length >0 )
   {
    return(
        <GridPostList posts={searchedPosts.documents}/>
    )
   }
    return (
     <p className="text-light-4 mt-10 text-center w-full">No Posts Found</p>
  )
}

export default SearchResults