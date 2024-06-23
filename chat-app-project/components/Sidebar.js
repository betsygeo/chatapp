import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { Flex, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebaseconfig";
import getOtherEmail from "../utils/getOtherEmail";
import { addDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("Enter email of chat recipient");
    if (!chatExists(input) && input != user.email) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] });
    }
  };
  const chatList = () => {
    return chats
      ?.filter((chat) => chat.users.includes(user.email))
      ?.map((chat) => (
        <Flex
          p={3}
          _hover={{ bg: "blue.100", cursor: "pointer" }}
          align="center"
          onClick={() => redirect(chat.id)}
        >
          <Avatar src="chat" marginEnd={3}></Avatar>
          <Text>{getOtherEmail(chat.users, user)}</Text>
        </Flex>
      ));
  };

  return (
    <Flex
      //bg="blue.100"
      w="300px"
      h="100%"
      borderEnd="1px solid"
      borderColor="gray.200"
      direction="column"
    >
      <Flex
        //bg="red.100"
        h="81px"
        w="100%"
        align="center"
        justifyContent="space-between"
        p={3}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Flex align="center">
          <Avatar src={user.photoURL} margin={3}></Avatar>
          <Text>{user.displayName}</Text>
        </Flex>

        <IconButton
          size="sm"
          isRound
          onClick={() => signOut(auth)}
          icon={<ArrowLeftIcon />}
        ></IconButton>
      </Flex>

      <Button m={5} p={4} onClick={() => newChat()}>
        New Chat
      </Button>

      <Flex
        direction="column"
        overflow="scroll"
        sx={{ scrollbarWidth: "none" }}
      >
        {chatList()}
      </Flex>
    </Flex>
  );
}
