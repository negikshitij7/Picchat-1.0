import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from '@/components/ui/button'
import {useForm} from "react-hook-form"
 
import {  Form,  FormControl,  FormDescription,  FormField,  FormItem,  FormLabel,  FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { Loader } from "lucide-react"
import {Link,useNavigate} from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"


import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"




const SignupForm=()=>{
  const {toast}=useToast()
  const {checkAuthUser}=useUserContext();
  const navigate=useNavigate();
  const {mutateAsync: createUserAccount,isLoading: isCreatingUser}=useCreateUserAccount()
  const {mutateAsync: signInAccount}=useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name:'',
      username: "",
      email:'',
      password:"",
    },
  })
 

 async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser=await createUserAccount(values);  // first add user to database
    
    if(!newUser){
      return  toast({
          title: "Sign up failed, please try again"})     
    }
    
    const session=await signInAccount({        // Then sign in the user to the session
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

      <div className="sm:w-420 flex-center flex-col ">
         <img src="\assets\images\PUK.svg" alt="logo" className="w-24 h-24" />
         <h2 className="h3-bold md:h2-bold pt-5 ms:pt-12">Create a new account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">To use Picchat,enter your details</p>
     

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input " {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
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
       {isCreatingUser?(
        <div className="flex-center gap-2">
          <Loader/> Loading....
        </div>
       ):"Sign up"}
       </Button>

       <p className="text-small-regular text-light-2 text-center mt-2">
         Already have an account?
         <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Sign in</Link>
       </p>
      </form>
      </div>
    </Form>
    
  )
}

export default SignupForm;