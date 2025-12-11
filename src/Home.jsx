import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "./context/AuthContext";
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc,setDoc, getDoc } from "firebase/firestore";
import Hero from "./component/Hero";
import Hero2 from "./component/Hero2";
import Wishlist from "./Wishlist";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


export default function Home() {

  const navigate = useNavigate()

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // If no user → redirect to login
      if (!user) {
        navigate("/login");
        return;
      }

      // Reload user data to get latest emailVerified status
      await user.reload();

      if (!user.emailVerified) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return(
  <>

  <section className="mt-5">

    <Hero2 />
    
  </section>

  


    </>
  );
}
