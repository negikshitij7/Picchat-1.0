
import { Outlet,Navigate } from 'react-router-dom'
const AuthLayout=()=>{
    const isAuthenticated=false;

    return(
       <>
        {isAuthenticated? (
            <Navigate to="/" />
        ):(
         <>
         <section className='flex flex-1 justify-center items-center flex-col py-10'>

            <Outlet/>
         </section>

         <div className='hidden xl:flex flex-row w-1/2'>
         <img src="\assets\images\sideimg.jpg" alt="Image" className='hidden xl:block h-screen w-full object-cover bg-no-repeat opacity-80'/>
          
          {/* <div className='hidden xl:flex flex-row w-1/2'> 
         <div className='hidden xl:flex flex-col w-1/2'>
         <img src="\assets\images\cat.jpg" alt="Image" className='hidden xl:block  h-1/2 object-cover bg-no-repeat opacity-80'/>
         <img src="\assets\images\japan.jpg" alt="Image" className='hidden xl:block   h-1/2 object-cover bg-no-repeat opacity-80'/>
         </div>
         
         <img src="\assets\images\drawge.jpg" alt="Image" className='hidden xl:block h-screen w-1/2  object-cover bg-no-repeat opacity-80'/>
         </div> */}
         </div>
         </>  
        )}
       </>
    )
}
export default AuthLayout