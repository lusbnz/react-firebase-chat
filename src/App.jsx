import { useEffect } from "react";
import Chat from "./components/chat/Chat"
import List from "./components/list/List"
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user.uid);
    })

    return () => {
      unSub()
    }
  }, [fetchUserInfo])

  return (
    <>
      {/* {isLoading ? (
        <div className="loading">Loading...</div>
      ) : */}
        <div className='container'>
          {!currentUser ? (
            <Login />
          ) : (
            <>
              <List />
              {chatId && <Chat />}
            </>
          )
          }
          <Notification />
        </div >
      {/* } */}
    </>
  )
}

export default App