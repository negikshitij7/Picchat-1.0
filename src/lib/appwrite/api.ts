import {ID} from "appwrite"

import { INewPost, INewUser, IUpdatePost, IUpdateProfile } from "@/types";
import { account, avatars,appwriteConfig,databases, storage } from "./config";
import { Query } from "appwrite";

export async function createUserAccount(user:INewUser){
try{
  const newAccount = await account.create(
   ID.unique(),  
   user.email,
   user.password,
   user.name
  );
  if(!newAccount)throw Error;

  const avatarUrl= avatars.getInitials(user.name);

  const newUser=await saveUserToDB({
  accountId:newAccount.$id,
  name:newAccount.name,
  email:newAccount.email,
  username:user.username,
  imageUrl:avatarUrl,
  })
  return newUser;
}
catch(error)
{
    console.log(error);
    return error;
}
}

export async function saveUserToDB(user:{ //some values of user object have been destructured
  accountId:string;
  name:string;
  imageUrl:URL;
  email: string;
  username:string;
}
  ){
    try {
      const newUser=await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user,
      )
      return newUser;
    } catch (error) {
      console.log(error);
    }

  }


  export async function signInAccount(user:{email:string;password:string;}){
    try{
     const session= await account.createEmailSession(user.email,user.password);
    return session;
    }
    catch(error){
      console.log(error)
    }
  }

 
  export async function getCurrentUser(){
    try {
      const currentAccount=await account.get();

      if(!currentAccount) throw Error;

      const currentUser=await databases.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         [Query.equal('accountId',currentAccount.$id)]  
      )

      if(!currentUser) throw Error;

      return currentUser.documents[0];
    } catch (error) {
      console.log(error)
    }
  }


 export async function signOutAccount(){
 try {
  const  session= await account.deleteSession("current");
  return session
 } catch (error) {
  console.log(error);
 }

 }

 export async function createPost(post:INewPost){
   try{
        const uploadedFile=await uploadFile(post.file[0])

        if(!uploadedFile)throw Error

        const fileUrl=getFilePreview(uploadedFile.$id)

        if(!fileUrl){

          deleteFile(uploadedFile.$id)
          throw Error
        }

        console.log(post.tags)
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        const newpost=await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.postCollectionId,
          ID.unique(),
          {
            user:post.userId,
            Caption:post.caption,
            Image_url:fileUrl,
            imageId:uploadedFile.$id,
            Location:post.location,
            Tags:tags
          }
        )
        
        if(!newpost)
        {
          deleteFile(uploadedFile.$id)
          throw Error
        }

        return newpost

   }
   catch(error)
   {
     console.log(error);
   } 
 }

 //for uploading the file
 export async function uploadFile(file:File){
  try{

    const uploadedFile=await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )

    return uploadedFile
  }
  catch(error)
  {
    console.log(error)
  }
 }

//for getting the file id (image id)
 export  function getFilePreview(fileId:string){
try {
   const fileUrl=storage.getFilePreview(
    appwriteConfig.storageId,
    fileId,
    2000,
    2000,
    "top",
    100
   )

return fileUrl;

} catch (error) {
  console.log(error)
}
}   

//for deleting a file using its id if something went wrong
export async function deleteFile(fileId:string){
  try {
    await storage.deleteFile(
      appwriteConfig.storageId,
      fileId
    )

    return {
      status:'ok'
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getRecentPosts()
{try{
  const posts=await databases.listDocuments(
     appwriteConfig.databaseId,
     appwriteConfig.postCollectionId,
     [Query.orderDesc('$createdAt'),Query.limit(20)]
      

  ) 

     if(!posts) throw Error

     return posts
}
catch(error)
{
  console.log(error)
}
}

export async function likePost(postId:string,likesArray:string[]){
 try { 
    const updatePost=await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    postId,
    {
      likes:likesArray
    }
   )
   if(!updatePost) throw Error;

   return updatePost

 } catch (error) {
  console.log(error)
 }
}
export async function savePost(postId:string,userId:string){
 try { 
    const savePost=await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.savesCollectionId,
    ID.unique(),
    {
      user:userId,
      post:postId
    }
   )
   if(!savePost) throw Error;

   return savePost

 } catch (error) {
  console.log(error)
 }
}

export async function deleteSavedPost(savedPostId:string){
 try { 
    const statusDelete=await databases.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.savesCollectionId,
    savedPostId
   )
   if(!statusDelete) throw Error;

   return {status:'ok'}

 } catch (error) {
  console.log(error)
 }
}


export async function getPostById(postId:string){
try {
  
 const post=await databases.getDocument(
  appwriteConfig.databaseId,
  appwriteConfig.postCollectionId,
  postId
 )


 return post

} catch (error) {
  console.log(error)
}


}


export async function updatePost(post:IUpdatePost){
  const isFileChanged=post.file.length>0

  try{
 
       let image={
        imageUrl:post.imageUrl,
        imageId:post.imageId
       }   

       if(isFileChanged)
       {
        const uploadedFile=await uploadFile(post.file[0])

        
       if(!uploadedFile)throw Error

       const fileUrl=getFilePreview(uploadedFile.$id)

       if(!fileUrl){

         deleteFile(uploadedFile.$id)
         throw Error
       }

       image={...image,imageUrl:fileUrl,imageId:uploadedFile.$id}
       }

       


       console.log(post.tags)
       const tags = post.tags?.replace(/ /g, "").split(",") || [];

       const updatePost=await databases.updateDocument(
         appwriteConfig.databaseId,
         appwriteConfig.postCollectionId,
         post.postId,
         {
          
           Caption:post.caption,
           Image_url:image.imageUrl,
           imageId:image.imageUrl,
           Location:post.location,
           Tags:tags
         }
       )
       
       if(!updatePost)
       {
         deleteFile(post.imageId)
         throw Error
       }

       return updatePost

  }
  catch(error)
  {
    console.log(error);
  } 
}


export async function deletePost(postId:string,imageId:string)
{
  if(!postId || !imageId) throw Error;

  try {
    
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    )

    // await deleteFile(imageId)
 
  return {status:'ok'}     
 
  } catch (error) {
    console.log(error)
  }
}


export async function getInfinitePosts({pageParam}:{pageParam:number}){ // pageParam is the number of posts that we have to skim through

const queries:any[]=[Query.orderDesc('$updatedAt'),Query.limit(2)]

if(pageParam){
  queries.push(Query.cursorAfter(pageParam.toString()))// if we reach new page then it will load next (pageParam)number of posts 
}
try {
  const posts=await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    queries
  )
  
  if(!posts) throw Error;
  return posts;

} catch (error) {
  console.log(error)
}

}


export async function searchPosts(searchTerm:string)
{
  try {

    const posts= databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search('Caption',searchTerm)]
    )
    if(!posts) throw Error;
    return posts 

  } catch (error) {
    console.log(error)
  }
}

export async function getSavedPosts(userId:string){
try {
  const savedPosts=await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.savesCollectionId,
    [Query.equal('user',userId)]

  )

  if(!savedPosts) throw Error

  return savedPosts
} catch (error) {
  console.log(error)
}
}

export async function getUsers(){
try{
 const users=await databases.listDocuments(
  appwriteConfig.databaseId,
  appwriteConfig.userCollectionId,
  [Query.orderDesc('$createdAt'),Query.limit(10)]
 )

 if(!users) throw Error

 return users
}
catch(error)
{
  console.log(error)
}
}


export async function getUserById(userId:string){
try {
  const user=await databases.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId
  )

  if(!user) throw Error

  return user;

} catch (error) {
  console.log(error)
}
}



export async function updateProfile(profile:IUpdateProfile){

const isDpChanged=profile.file.length>0;
console.log(profile.file[0])
try {
 
  let image={
    imageUrl:profile.imageUrl,
    imageId:profile.imageId
  }

  if(isDpChanged)
  {
    
    const uploadedFile=await uploadFile(profile.file[0])

    if(!uploadedFile) throw Error

    const getfileurl=await getFilePreview(uploadedFile.$id)
    if(!getfileurl)
    {
      deleteFile(uploadedFile.$id)
      throw Error
    }

    image={...image,imageUrl:getfileurl,imageId:uploadedFile.$id}
  }

 

 const updatedProfile=await databases.updateDocument(
  appwriteConfig.databaseId,
  appwriteConfig.userCollectionId,
  profile.id,
  {
    username:profile.username,
    imageUrl:image.imageUrl,
    imageId:image.imageId,
    bio:profile.bio
  }

 )

 if(!updatedProfile)
 {
  deleteFile(profile.imageId)
  throw Error 
}

return updatedProfile;
} catch (error) {
  console.log(error)
}


}