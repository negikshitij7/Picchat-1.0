// import { Models } from 'appwrite'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
 
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { profileFormSchema } from '@/lib/validation'
// import ProfileUploader from '../shared/ProfileUploader'
// import { Textarea } from '../ui/textarea'
// import { useUpdateProfile } from '@/lib/react-query/queriesAndMutations'
// import { toast } from '../ui/use-toast'
// import { useNavigate } from 'react-router-dom'
 
// type profileFormProps={
//     user:Models.Document
// }


// const ProfileForm = (user:profileFormProps) => {
//      const {mutateAsync:updateProfile} =useUpdateProfile(); 
//       const navigate =useNavigate()

//       const form = useForm<z.infer<typeof profileFormSchema>>({
//         resolver: zodResolver(profileFormSchema),
//         defaultValues:{
//         file: [],
//         name: user.user.name,
//         username: user.user.username,
//         email: user.user.email,
//         bio: user.user.bio || "",
//       },
//       })



//       async function onSubmit(values: z.infer<typeof profileFormSchema>) {
//         const updatedProfile=await updateProfile({
//           ...values,
//           name:user.user.name,
//           email:user.user.email,
//           id:user.user.$id,
//           imageId:user.user.imageId,
//           imageUrl:user.user.imageUrl
//         })

//         if(!updatedProfile)
//         {
//           toast({title:"please try again"})
//         }
//         return navigate(`/profile/${updatedProfile?.$id}`)

//       }      

//     return (
   

 
//    <Form {...form} >
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="file"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="shad-form_label">Upload Profile Image</FormLabel>
//               <FormControl>
//                 <ProfileUploader fieldChange={field.onChange} mediaUrl={user?.user?.imageUrl}/>
//               </FormControl>              
//               <FormMessage className="shad-form_message"/>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="shad-form_label">Change Your Userame</FormLabel>
//               <FormControl>
//                <Input type="text" className='shad-input' placeholder={user.user.username} {...field}></Input>
//               </FormControl>              
//               <FormMessage className="shad-form_message"/>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="bio"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="shad-form_label">Add Bio</FormLabel>
//               <FormControl>
//                <Textarea className="shad-textarea custom-scrollbar bg-dark-4" placeholder={user.user.bio} {...field}></Textarea>
//               </FormControl>              
//               <FormMessage className="shad-form_message"/>
//             </FormItem>
//           )}
//         />
       
//         <div className='flex justify-end items-center gap-3'>
//         <Button className='shad-button_dark_4' type="submit">Submit</Button>
//         <Button className='shad-button_dark_4'>Cancel</Button>
//         </div>
//       </form>
//     </Form>



//   )
// }

// export default ProfileForm