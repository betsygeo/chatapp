import Sidebar from "../../components/Sidebar";
import { Avatar, Flex, FormControl, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, auth } from "../../firebaseconfig";
import { query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import getOtherEmail from "../../utils/getOtherEmail";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const Topbar = ({ email }) => {
  return (
    <Flex bg="gray.100" h="81px" w="100%" p={5}>
      <Avatar src="" marginEnd={3}></Avatar>
      <Heading size="lg">{email}</Heading>
    </Flex>
  );
};

const Bottombar = ({ id, user }) => {
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <FormControl p={3} onSubmit={sendMessage} as="form">
      <Flex bg="gray.100" h="64px" w="100%" p={3}>
        <Input
          placeholder="type"
          autocomplete="off"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button type="submit" hidden>
          Submit
        </Button>
      </Flex>
    </FormControl>
  );
};
export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const bottomOfChat = useRef();
  const [chat] = useDocumentData(doc(db, "chats", id));

  const getMessages = () =>
    messages?.map((message) => {
      const sender = message.sender === user.email;
      return (
        <Flex
          bg={!sender ? "blue.500" : "green.100"}
          alignSelf={!sender ? "flex-start" : "flex-end"}
          w="fit-content"
          minWidth="100px"
          p={3}
          borderRadius="lg"
          m={1}
        >
          <Text>{message.text}</Text>
        </Flex>
      );
    });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (bottomOfChat.current) {
        bottomOfChat.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => clearTimeout(timer); // Cleanup the timeout on component unmount or messages change
  }, [messages]);

  return (
    <Flex h="100vh">
      <Head>
        <title>Chat-App</title>
      </Head>
      <Sidebar />
      <Flex flex={1} direction="column">
        <Topbar email={getOtherEmail(chat?.users, user)}></Topbar>
        <Flex
          flex={1}
          overflowY="scroll"
          pt={4}
          direction="column"
          mx={5}
          sx={{ scrollbarWidth: "none" }}
        >
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>

        <Bottombar id={id} user={user} />
      </Flex>
    </Flex>
  );
}
