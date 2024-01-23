import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from '@/components/ui/button'
import {useForm} from "react-hook-form"
 
import {  Form,  FormControl,  FormDescription,  FormField,  FormItem,  FormLabel,  FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation as SigninValidation } from "@/lib/validation"
import { Loader } from "lucide-react"
import {Link,useNavigate} from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"



import { useUserContext } from "@/context/AuthContext"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"




const SigninForm=()=>{
  const {toast}=useToast()
  const {checkAuthUser,isLoading:isUserLoading}=useUserContext();
  const navigate=useNavigate();
  
  const {mutateAsync: signInAccount}=useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email:'',
      password:"",
    },
  })
 
  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof SigninValidation>) {
   
    console.log("here?")
    const session=await signInAccount({
      email: values.email,
      password: values.password
    });

   if(!session){
    return toast({title:'Sign in failed, please try again.'})
   }
   const isLoggedIn= await checkAuthUser();

   if(isLoggedIn){
    form.reset();
    navigate('/');
   }
   else{
     return toast({title:"Sign up failed.Please try again"})
   }

  }


  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
         <img src="\assets\images\PUK.svg" alt="Logo" className="w-28 h-28" />
         <h2 className="h3-bold md:h2-bold pt-5 ms:pt-12">Log in to your acoount</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back,please enter your details</p>
     

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormDescription>
         
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
           name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormDescription>
         
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
       {isUserLoading?(
        <div className="flex-center gap-2">
          <Loader/> Loading....
        </div>
       ):"Sign in"}
       </Button>

       <p className="text-small-regular text-light-2 text-center mt-2">
         New to Picchat?
         <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
       </p>
      </form>
      </div>
    </Form>
    
  )
}

export default SigninForm;