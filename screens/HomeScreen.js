import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import { auth, db } from '../firebase';
import { Icon } from '@rneui/themed';
import { collection, onSnapshot } from 'firebase/firestore';
import styles from '../styles/HomeScreenStyle';
import { useAuth } from '../components/AuthContext';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { user } = useAuth(); 

  const signOut = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Welcome back ${user?.displayName} to the Mobile Development Classes Chats`,
      headerStyle: { backgroundColor: '#C8102E' },
      headerTitleStyle: styles.headerTitle,
      headerTintColor: "white",
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={signOut}
        >
          <Icon name="log-out" type="feather" color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerRightIcon}
          onPress={() => navigation.navigate("AddChat")}
        >
          <Icon name="plus" type="feather" color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, user]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };

  return (
    <ScrollView style={styles.container}>
      {chats.map(({ id, data: { chatName } }) => (
        <CustomListItem
          key={id}
          id={id}
          chatName={chatName}
          enterChat={enterChat}
        />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
