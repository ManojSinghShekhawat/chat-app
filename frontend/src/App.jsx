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

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

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
