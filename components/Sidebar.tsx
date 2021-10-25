import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { db, auth } from '../firebase';
import { useFirestoreCollection } from '../utils/useFirestoreCollection';
import { Container, Header, UserAvatar, IconsContainer, Search, SearchInput, SidebarButton } from '../styles/sidebar';

const Sidebar = () => {
   const [user] = useAuthState(auth);
   // const [chatsSnapshot, setChatsSnapshot] = useState<QuerySnapshot>();
   const userChatRef = collection(db, 'chats');
   const q = query(userChatRef, where('users', 'array-contains', user.email));
   const [chatsSnapshot] = useFirestoreCollection(q);
   
   // useEffect(() => {
   //    (async () => {
   //       const querySnapshot = await getDocs(q);
   //       setChatsSnapshot(querySnapshot);
   //    })();
   // }, [q]);

   const createChat = () => {
      const input = prompt('Please enter an email address for the user you wish to chat with');

      if (!input) return null;

      if (EmailValidator.validate(input) && input !== user.email && !chatAlreadyExists(input)) {
         // We need to add the chat into the DB 'chats' collection if the email doesn't already exist in the chat and the email is not the current user's email
         (async () => {
            await addDoc(collection(db, 'chats'), {
               users: [user.email, input]
            });
         })()
      }
   };

   const chatAlreadyExists = (recipientEmail: string) => {
      return !!chatsSnapshot?.docs.find((chat: DocumentData) => {
         return chat.data().users.includes(recipientEmail)
      });
   };
   
   return (
      <Container>
         <Header>
            <UserAvatar onClick={() => auth.signOut()} />
            <IconsContainer>
               <IconButton>
                  <ChatIcon />
               </IconButton>
               <IconButton>
                  <MoreVertIcon />
               </IconButton>
            </IconsContainer>
         </Header>

         <Search>
            <SearchIcon />
            <SearchInput placeholder="Search in chats" />
         </Search>

         <SidebarButton onClick={createChat}>
            Start a New Chat
         </SidebarButton>

         {/* List of Chats */}
      </Container>
   )
};

export default Sidebar;