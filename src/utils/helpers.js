import { auth } from "../config/firebase.config"
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign-in success:", result.user);
      return result.user;
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };
  
  export const signInWithGitHub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log("GitHub sign-in success:", result.user);
      return result.user;
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      throw error;
    }
  };

export const Menus = [
    { id: uuidv4(), name: "Projects", uri: "/home/projects" },
    { id: uuidv4(), name: "Profile", uri: "/home/profile" },
]

export const signOutAction = async () => {
    await auth.signOut().then(() => {
        window.location.reload();
    })
}