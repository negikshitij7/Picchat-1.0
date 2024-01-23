import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { toast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"

type PostFormProps={
  post?: Models.Document,
  action:"Create" | "Update"
}

const PostForm = ({post,action}: PostFormProps) => {
    
  console.log(post);
    const {mutateAsync: createPost,isLoading: isLoadingCreate}=useCreatePost();
    const {mutateAsync:updatePost,isLoading:isLoadingUpdate}=useUpdatePost();  
    

    const {user}=useUserContext()
 
    const navigate=useNavigate(); 
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
          caption: post ? post?.Caption:"",
          file:[],
          location:post ? post?.Location:"",
          tags:post? post?.Tags.join(','):""
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof PostValidation>) {
        
        if(post && action === 'Update')
        {
          const updatedPost=await updatePost({
            ...values,
            postId:post.$id,
            imageId:post?.imageId,
            imageUrl:post?.Image_url
          })

          if(!updatedPost)
          {
            toast({title:'Please try again'})
          }

          return navigate(`/posts/${post.$id}`)
        }
      
      
        const newpost=await createPost(
        {
          ...values,
          userId:user.id,
        }
      );
        
         if(!newpost)
         {
          toast({
            title:"Post could not be created. Please try again"
          })
         }

         //navigate to the home page if successfully created the post
        navigate('/');

      }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Caption</FormLabel>
            <FormControl>
              <Textarea className="shad-textarea custom-scrollbar" placeholder="" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Photos</FormLabel>
            <FormControl>
             <FileUploader 
              fieldChange={field.onChange}
              mediaUrl={post?.Image_url}
             />
            </FormControl>
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Location</FormLabel>
            <FormControl>
             <Input type="text" className="shad-input" {...field}/>
            </FormControl>
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Tags (Separated by comma " , ")</FormLabel>
            <FormControl>
             <Input type="text" className="shad-input" placeholder="Art, Expression, learn....." {...field}/>
            </FormControl>
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />

      <div className="flex gap-4 items-center justify-end">
      <Button
       type="button"
       className="shad-button_dark_4" 
       disabled={isLoadingCreate || isLoadingUpdate}
       >Cancel
       </Button>
      <Button type="submit" className="shad-button_primary whitespace-nowrap">{action} Post</Button>
      </div>

      
    </form>
  </Form>
  )
}

export default PostForm