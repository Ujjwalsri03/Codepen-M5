import React, { useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { signInWithGitHub, signInWithGoogle } from "../utils/helpers";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setIsEmailValidationStatus] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false); // New state for success alert

  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
            setAlertSuccess(true); 
            setTimeout(() => setAlertSuccess(false), 4000); 
          }
        })
        .catch((err) => {
          console.log(err);
          setAlertError(true); 
          setTimeout(() => setAlertError(false), 4000); 
        });
    }
  };

  const loginWithEmailPassword = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
            setAlertError(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setAlertError(true);
          setTimeout(() => setAlertError(false), 4000); // Auto hide after 4 seconds
        });
    }
  };

  return (
    <div className="w-full py-3">
      <img
        src={Logo}
        className="object-contain w-32 opacity-50 h-auto"
        alt="logo"
      />
      <div className="w-full flex flex-col items-center justify-center py-1">
        <p className="py-3 text-xl text-primaryText"> Register Here...</p>
        <div className="px-8 w-full md:w-auto py-3 rounded-xl bg-secondary shadow-md flex flex-col justify-center items-center gap-3">
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setIsEmailValidationStatus={setIsEmailValidationStatus}
          />
          <UserAuthInput
            label="Password"
            placeHolder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          <AnimatePresence>
            {alertError && (
              <motion.p
                key={"AlertMessage"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500"
              >
                Invalid User or Password
              </motion.p>
            )}
            {alertSuccess && (
              <motion.p
                key={"SuccessMessage"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-green-500"
              >
                User registered successfully!
              </motion.p>
            )}
          </AnimatePresence>

          {!isLogin ? (
            <motion.div
              onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center px-3 py-2 rounded-xl hover:bg-emerald-400 w-full cursor-pointer bg-emerald-500"
            >
              <p className="text-lg text-white">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={loginWithEmailPassword}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center px-3 py-2 rounded-xl hover:bg-emerald-400 w-full cursor-pointer bg-emerald-500"
            >
              <p className="text-lg text-white">Login</p>
            </motion.div>
          )}
          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already Have an account!{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Don't have an account!{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Create Here
              </span>
            </p>
          )}

          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          <div
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-2 rounded-xl hover:bg-[rgba(256,256,256,0.5)] cursor-pointer"
          >
            <FcGoogle className="text-2xl" />
            <p className="text-[17px] text-white">Sign in with Google</p>
          </div>

          <div className="flex items-center justify-center gap-10">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          <div
            onClick={signInWithGitHub}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-2 rounded-xl hover:bg-[rgba(256,256,256,0.5)] cursor-pointer"
          >
            <FaGithub className="text-2xl text-white" />
            <p className="text-[17px] text-white">Sign in with GitHub</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
