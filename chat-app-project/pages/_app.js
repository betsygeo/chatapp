import Login from "../components/Login";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Chat from "./chat/[id]";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <ChakraProvider>
        <Center>
          <Spinner size="lg" />
        </Center>
      </ChakraProvider>
    );
  }

  if (!user) {
    return (
      <ChakraProvider>
        <Login></Login>
      </ChakraProvider>
    );
  }
  //return
  return (
    <ChakraProvider>
      <>
        <Chat />
      </>
    </ChakraProvider>
  );
}

export default MyApp;
