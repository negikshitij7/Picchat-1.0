
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
         <img src="public\assets\images\sideimg.jpg" alt="logo" className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat opacity-80'/>
          
          <div className='hidden xl:flex flex-row w-1/2'> 
         <div className='hidden xl:flex flex-col w-1/2'>
         <img src="public\assets\images\cat.jpg" alt="logo" className='hidden xl:block  h-1/2 object-cover bg-no-repeat opacity-80'/>
         <img src="public\assets\images\japan.jpg" alt="logo" className='hidden xl:block   h-1/2 object-cover bg-no-repeat opacity-80'/>
         </div>
         
         <img src="public\assets\images\drawge.jpg" alt="logo" className='hidden xl:block h-screen w-1/2  object-cover bg-no-repeat opacity-80'/>
         </div>
         </div>
         </>  
        )}
       </>
    )
}
export default AuthLayout