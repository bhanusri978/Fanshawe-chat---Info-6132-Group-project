import React from 'react';
import { ListItem, Icon } from '@rneui/themed';
import styles from '../styles/CustomListItemStyle';
import { Image, Alert, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const confirmDelete = () => {
    console.log("Delete tapped for:", chatName); 

    Alert.alert(
      "Delete Chat",
      `Are you sure you want to delete "${chatName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            console.log("Confirmed delete for:", id); 
            await deleteDoc(doc(db, 'chats', id))
              .then(() => {
                console.log("Chat deleted successfully");
              })
              .catch((error) => {
                console.error("Error deleting chat:", error.code, error.message);
                alert("Failed to delete chat.");
              });
          }
        }
      ]
    );
  };

  return (
    <ListItem bottomDivider>
      <TouchableOpacity
        onPress={() => enterChat(id, chatName)}
        style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
      >
        <Image
          source={require('../assets/fanshawe-icon.png')}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
        </ListItem.Content>
      </TouchableOpacity>

      <TouchableOpacity onPress={confirmDelete}>
        <Icon
          name="trash"
          type="feather"
          color="red"
        />
      </TouchableOpacity>
    </ListItem>
  );
};

export default CustomListItem;
