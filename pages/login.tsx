import { Button } from '@material-ui/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

const Login: NextPage = () => {
   const signIn = () => {
      signInWithPopup(auth, provider)
         .then((result) => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
         }).catch((error) => {
            // Handle errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert(errorMessage);
         });
   };
   return (
      <Container>
         <Head>
            <title>Login</title>
         </Head>
         <LoginContainer>
            <Logo
               src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
            />
            <Button
               variant="outlined"
               onClick={signIn}
            >Sign in with Google</Button>
         </LoginContainer>
      </Container>
   )
};

export default Login;

const Container = styled.div`
   display: grid;
   place-items: center;
   height: 100vh;
`;

const LoginContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 100px;
   background-color: white;
   border-radius: 15px;
   box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.3);
`;

const Logo = styled.img`
   width: 200px;
   height: 200px;
   margin-bottom: 50px;
`;