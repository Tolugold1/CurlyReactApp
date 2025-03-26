import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import { 
  logOut, 
  customers_loading, 
  analytics_loading, 
  items_loading,
  profile_loading, 
  signup_loading, 
  login_loading,
  signInFunction
} from "../store/ActionCreators";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let login = useSelector((state) => state.login);
  const [ acctTypeT, setAcctType ] = useState(null);

  const google = useSelector((state) => state.google);

  useEffect(() => {
    dispatch(logOut());
    dispatch(login_loading());
    dispatch(analytics_loading());
    dispatch(customers_loading());
    dispatch(items_loading());
    dispatch(profile_loading());
    dispatch(signup_loading());
  }, []);

  useEffect(() => {
    if (login.message?.acctType == "Official" && login.message?.status == "succeeded" && login.message?.token !== null) {
      navigate('/business-dashboard');
    }
  }, [login.message?.acctType, login.message?.status, login.message?.token]);

  useEffect(() => {
    if (login.errMess) {
      setTimeout(() => {
        toast.error(login.errMess, {
          position: "top-center",
        });
      }, 50);
      dispatch(login_loading());
    }
  }, [login.errMess]);

  // console.log("acctType", acctType);

  const onSubmit = async (data) => {
    try {
      data.acctType = "Official";
      // Dispatch the login action
      console.log("data", data);
      const resultAction = await dispatch(signInFunction(data));
      console.log('resultAction:', resultAction);
      if (resultAction?.data?.status == 'Sign in successful' && resultAction?.data?.statusCode == 200) {
        // Redirect based on the checkbox (isBusiness) value.
        if (data.acctType == "Official") {
          navigate('/business-dashboard');
        }
      } else {
        // Handle errors (you could show a toast or error message here)
        console.error('Failed to login:', resultAction.error.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] p-4">

       {/* Back to Home Button */}
       <Link to="/" className="absolute top-4 left-4 text-gray-400 hover:text-pink-400 flex items-center">
          <FiArrowLeft className="mr-2" /> Home
        </Link>
      <div className="bg-[#29293f] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center">Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          {/* Username / Email Field */}
          <div className="mb-4">
            <label className="block text-gray-400">Email/Username:</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 bg-[#1a1a2e] text-white rounded border border-gray-600 focus:border-pink-500 focus:ring focus:ring-pink-500 outline-none"
              {...register('username', { required: 'Email/Username is required' })}
              placeholder="Enter your email or username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-400">Password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 bg-[#1a1a2e] text-white rounded border border-gray-600 focus:border-pink-500 focus:ring focus:ring-pink-500 outline-none"
              {...register('password', { required: 'Password is required' })}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Checkbox to Select Business or Client */}
          <div className='flex items-center justify-between'>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="isBusiness"
                name="check"
                className="mr-2"
                checked={acctTypeT == "Official"}
                onChange={() => setAcctType("Official")}
              />
              <label htmlFor="isBusiness" className="text-gray-400">
                Login as Business
              </label>
            </div>
            {/* <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="isClient"
                name="check"
                className="mr-2"
                checked={acctTypeT == "Client"}
                onChange={() => setAcctType("Client")}
              />
              <label htmlFor="isClient" className="text-gray-400">
                Login as Client
              </label>
            </div> */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-orange-400 py-2 rounded text-white font-semibold hover:opacity-90"
          >
            Login
          </button>
        </form>

                {/* Google Sign-In Button */}
        {/* <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-white text-gray-700 py-2 rounded font-semibold hover:bg-gray-100 shadow-md transition"
          >
            <FcGoogle className="mr-2 text-2xl" />
            Sign in with Google
          </button>
        </div> */}

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-pink-400">
            Forgot Password?
          </Link>
        </div>

        {/* Signup Redirect */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-400 font-semibold">Sign Up</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
