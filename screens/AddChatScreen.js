import { View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Input } from '@rneui/themed';
import { db } from '../firebase';
import styles from '../styles/AddChatScreenStyle';
import { collection, addDoc } from 'firebase/firestore';

const AddChatScreen = ({ navigation }) => {
  const [chatName, setChatName] = useState("");

  const createChat = async () => {
    try {
      await addDoc(collection(db, "chats"), {
        chatName: chatName,
      });
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };
  

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerStyle: { backgroundColor: '#C8102E' },
      headerTitleAlign: "center",
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={chatName}
        onChangeText={(text) => setChatName(text)}
      />
      <Button
        onPress={createChat}
        title="Create new chat"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        raised
      />
    </View>
  );
};

export default AddChatScreen;
