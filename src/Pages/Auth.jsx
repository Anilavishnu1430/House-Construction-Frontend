import React from 'react'
import { Button, Label, TextInput, Card } from "flowbite-react";
import { Link } from 'react-router-dom';
import { registerAPI } from '../services/allAPIs';
import { loginAPI } from '../services/allAPIs';
import { googleLoginAPI } from '../services/allAPIs';
import { ToastContainer, toast , Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


function Auth({ register }) {

  console.log(register);

  const navigate = useNavigate();

  const [userDetails,setUserDetails]=React.useState({
    username:"",
    email:"",
    password:""
  })

  const handleRegister=async()=>{
    console.log(userDetails);
    if(userDetails.username && userDetails.email && userDetails.password){
      try{
      const response = await registerAPI(userDetails)
      console.log(response);
      if(response.status===201){
        toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
        setTimeout(()=>{
          navigate("/login")
        },4000)
        setUserDetails({
          username:"",
          email:"",
          password:"",
        })
      }
      else{
        console.log(response);
        
      }
    }
    catch(err){
      console.log(err);
      console.log(err.response);
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }
    }
    else{
      toast.warn('Please fill the form', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
    }
  }

  const handleLogin=async()=>{
    console.log(userDetails);
    if(userDetails.email && userDetails.password){
      try{
      const response = await loginAPI(userDetails)
      console.log(response);
      if(response.status===200){
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem("existingUser",JSON.stringify(response.data.existingUser))
        toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
        if(response.data.existingUser.role=="user"){
          setTimeout(()=>{
          navigate("/")
        },4000)
        setUserDetails({
          email:"",
          password:"",
        })
        }
        else if(response.data.existingUser.role=="contractor"){
          setTimeout(()=>{
          navigate("/conhome")
        },4000)
        setUserDetails({
          email:"",
          password:"",
        })
        }
        else{
          setTimeout(()=>{
          navigate("/adminhome")
        },4000)
        setUserDetails({
          email:"",
          password:"",
        })
        }
      }
    }
    catch(err){
      console.log(err);
      console.log(err.response);
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }
    }
    else{
      toast.warn('Please fill the form', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
    }
  }

  const handleGoogleLogin=async(credential)=>{
    console.log(credential);
    const decoded = jwtDecode(credential.credential);
    console.log(decoded);
    try{
      const response = await googleLoginAPI({
        email:decoded.email,
        password:"googlepswd",
        username:decoded.name,
        profile:decoded.picture,
      });
      console.log(response);
      if (response.status === 200) {
          sessionStorage.setItem("token",response.data.token)
          sessionStorage.setItem("existingUser",JSON.stringify(response.data.existingUser) )
        }
        else if(response.status === 201){
          sessionStorage.setItem("token",response.data.token)
          sessionStorage.setItem("existingUser",JSON.stringify(response.data.newUser) )
        }
        navigate('/')
    }
    catch(err){
      console.log(err); 
    }
  }

  return (
    <div>
      <section className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/originals/03/b9/f3/03b9f31636b6093353836a1266638d16.jpg')"}}>
        <Card className="w-full max-w-md border-black bg-[#5e445c] text-black shadow-lg">
          <h1 className="text-black text-2xl font-bold text-center mb-6">DreamConstruct</h1>
          {
            register ?
              <h1 className="text-2xl font-bold text-center text-black mb-6">
                Register
              </h1>
              :
              <h1 className="text-2xl font-bold text-center text-black mb-6">
                Login
              </h1>
          }

          <form className="space-y-5">
            {
              register &&
              <div>
                <Label htmlFor="username" value="Username" className="mb-1 text-black" />Username<Label />
                <TextInput onChange={e=>setUserDetails({...userDetails,username:e.target.value})}
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                />
              </div>
            }

            <div>
              <Label htmlFor="email" className="mb-1 text-black">Email ID</Label>
              <TextInput onChange={e=>setUserDetails({...userDetails,email:e.target.value})}
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" value="Password" className="mb-1 text-black" />Password<Label />
              <TextInput onChange={e=>setUserDetails({...userDetails,password:e.target.value})}
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
              <p className="text-xs text-black-400 mt-1">
                *Never share your password with others.
              </p>
            </div>

            {
              register ?
                <Button onClick={handleRegister}
                  className="w-full bg-[#660000] text-black py-2 rounded-md font-semibold hover:bg-[#2f222e] transition-colors"
                >
                  Register
                </Button>
                :
                <>
                <Button onClick={handleLogin}
                  className="w-full bg-[#660000] text-black py-2 rounded-md font-semibold hover:bg-[#2f222e] transition-colors"
                >
                  Login
                </Button>
                
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleGoogleLogin(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />;
                </>
            }
          </form>

          <ToastContainer position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}/>

          {register ?
            <p className="text-sm text-center mt-6">
              
              <Link to="/login" className="text-black hover:underline">
                Already a user? Login
              </Link>

            </p>
            :
            <div className="flex justify-between items-center text-sm mt-6">
              <Link to="/forgot-password" className="text-black hover:underline">
                Forgot Password?
              </Link>
              <Link to="/register" className="text-black hover:underline">
                New User? Register
              </Link>
            </div>
          }
        </Card>
      </section>
    </div>
  )
}

export default Auth
