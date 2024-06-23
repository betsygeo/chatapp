import Head from "next/head";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import { ChatIcon } from "@chakra-ui/icons";
export default function login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Center h="100vh">
        <Stack
          align={"center"}
          bgColor="gray.600"
          p={16}
          rounded="3xl"
          spacing={12}
          boxShadow="3xl"
        >
          <Box bgColor="blue.500" w="fit-content" p={5} rounded="3xl">
            <ChatIcon w="100px" h="100px" color="white"></ChatIcon>
          </Box>
          <Button
            boxShadow="md"
            onClick={() => signInWithGoogle("", { prompt: "select_account" })}
          >
            Google Sign In
          </Button>
        </Stack>
      </Center>
    </>
  );
}
