import Header from "./components/Header";
import MessagesBox from "./components/MessagesBox";
import ChatBox from "./components/ChatBox";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authCheck } from "./components/redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);
  const userId = useSelector((state) => state.user?.user?.id);
  // console.log(userId);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // console.log(isAuthenticated);
  // console.log(isAuthenticated);
  // if (!isAuthenticated) {
  //   return <div>Please log in to access the chat.</div>;
  // }

  return (
    <>
      {!isAuthenticated ? (
        <Header />
      ) : (
        <>
          <Header />
          <MessagesBox />
          <ChatBox />
        </>
      )}
    </>
  );
}

export default App;
