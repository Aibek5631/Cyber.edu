import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  const signup = async (email, password) => {
    setError("");
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length) {
      throw new Error("auth/email-already-in-use");
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      role: "user",
      createdAt: new Date()
    });
    return cred;
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const ref  = doc(db, "users", fbUser.uid);
        const snap = await getDoc(ref);
        const data = snap.exists()
          ? snap.data()
          : { email: fbUser.email, role: "user" };
        setUser({ uid: fbUser.uid, ...data });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = { user, signup, login, logout, error, setError };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}