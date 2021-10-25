import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../firebase';

import Login from '../pages/login';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }: AppProps) {
   const [user, loading] = useAuthState(auth);

   useEffect(() => {
      (async () => {
         if (user) {
            await setDoc(doc(db, 'users', user.uid), {
               email: user.email,
               lastSeen: serverTimestamp(),
               photoURL: user.photoURL
            }, { merge: true });
         }
      })()
   }, [user]);

   if (loading) return <Loading />
   if (!user) return <Login />
   return <Component {...pageProps} />;
}
export default MyApp;
