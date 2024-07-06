import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { useUserContext } from "@/context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import { profileFormSchema } from '@/lib/validation';
import { useGetUserById, useUpdateProfile } from '@/lib/react-query/queriesAndMutations';
import { Input } from '@/components/ui/input';
import Loader from '@/components/shared/Loader';
import ProfileUploader from '@/components/shared/ProfileUploader';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
const UpdateProfile = () => {
 const {id}=useParams();
 const {toast}=useToast()
 const navigate=useNavigate()
 const {data:curruser}=useGetUserById(id || '')
 const {user,setUser}=useUserContext()
 if(!curruser || curruser==undefined){
  return(
    <div className="flex-center w-full h-full">
      <Loader/>
    </div>
  )
 }
 const form=useForm<z.infer<typeof profileFormSchema>>({
  resolver:zodResolver(profileFormSchema),
  defaultValues:{
    username:curruser? curruser.username:"",
    file:curruser.file,
    bio:curruser? curruser.bio:"",
  }
})

const {mutateAsync:updateProfile}=useUpdateProfile()

 async function onSubmit(values:z.infer<typeof profileFormSchema>){

  const updatedUser=await updateProfile({
    id:curruser?.$id || 
    "",
    username:values.username,
    name:curruser?.name,
    imageUrl:curruser?.imageUrl,
    imageId:curruser?.imageId,
    email:curruser?.email,
    file:values.file,
    bio:values.bio
  })
  if (!updatedUser) {
    toast({
      title: `Update user failed. Please try again.`,
    });
  }

  setUser({
    ...user,
    bio:updatedUser?.bio,
    imageUrl:updatedUser?.imageUrl
  })

  return navigate(`/profile/${id}`)

 }

 
 
  return (
    <div className='flex flex-1'>
    <div className="common-container">
     <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
       
       <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Profile</h2>

     </div>
     <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Upload Profile Image</FormLabel>
              <FormControl>
                <ProfileUploader fieldChange={field.onChange} mediaUrl={curruser?.curruser?.imageUrl}/>
              </FormControl>              
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Change Your Userame</FormLabel>
              <FormControl>
               <Input type="text" className='shad-input' placeholder={curruser?.username} {...field}></Input>
              </FormControl>              
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Bio</FormLabel>
              <FormControl>
               <Textarea className="shad-textarea custom-scrollbar bg-dark-4" placeholder={curruser?.bio} {...field}></Textarea>
              </FormControl>              
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
       
        <div className='flex justify-end items-center gap-3'>
        <Button className='shad-button_dark_4' type="submit">Submit</Button>
        <Button className='shad-button_dark_4'>Cancel</Button>
        </div>
      </form>
    </Form>
    </div>
     </div>
  )
}

export default UpdateProfile