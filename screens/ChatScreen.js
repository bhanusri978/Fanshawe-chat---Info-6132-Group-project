import React, { useLayoutEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../styles/ChatScreenStyle';
import { TextInput } from 'react-native';
import { Icon } from '@rneui/themed';
import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { useAuth } from '../components/AuthContext'; 

const ChatScreen = ({ navigation, route }) => {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showIcons, setShowIcons] = useState(false);
  const scrollRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.chatName, // 👈 Only the chat name now
    });
  }, [navigation, route.params.chatName]);

  const sendMessage = async () => {
    Keyboard.dismiss();

    if (!input.trim()) return;

    await addDoc(
      collection(db, 'chats', route.params.id, 'messages'),
      {
        timestamp: serverTimestamp(),
        message: input,
        displayName: user?.displayName || 'Anonymous',
        email: user?.email,
      }
    );

    setInput('');
  };

  useLayoutEffect(() => {
    const q = query(
      collection(db, 'chats', route.params.id, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })));
    });

    return unsubscribe;
  }, [route]);

  const emojis = ['😊', '😂', '🔥', '👍', '❤️', '🥳', '😎', '😢'];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setShowIcons(false);
            }}
          >
            <ScrollView
              ref={scrollRef}
              contentContainerStyle={styles.scrollView}
              onContentSizeChange={() =>
                scrollRef.current.scrollToEnd({ animated: true })
              }
              keyboardShouldPersistTaps="handled"
            >
              {messages.map(({ id, data }) => {
                const isCurrentUser = data.email === user?.email;
                return (
                  <View
                    key={id}
                    style={[
                      styles.messageContainer,
                      isCurrentUser ? styles.currentUserAlign : styles.otherUserAlign,
                    ]}
                  >
                    <View
                      style={[
                        styles.messageBubble,
                        isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
                      ]}
                    >
                      <Text style={styles.messageText}>{data.message}</Text>
                    </View>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </TouchableWithoutFeedback>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Write Here"
              value={input}
              onChangeText={(text) => setInput(text)}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
              multiline={false}
            />

            <TouchableOpacity
              onPress={() => setShowIcons(!showIcons)}
              activeOpacity={0.7}
              style={{ marginLeft: 10 }}
            >
              <Icon name="smile-o" type="font-awesome" color="#C8102E" size={24} />
            </TouchableOpacity>

            <TouchableOpacity onPress={sendMessage} activeOpacity={0.2} style={styles.sendButton}>
              <Icon name="send" type="feather" color="#C8102E" size={24} />
            </TouchableOpacity>
          </View>

          {showIcons && (
            <View style={styles.iconSetContainer}>
              {emojis.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setInput(prev => prev + emoji);
                    setShowIcons(false);
                  }}
                >
                  <Text style={styles.icon}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
