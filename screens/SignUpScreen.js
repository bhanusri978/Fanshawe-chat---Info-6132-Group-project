import { View, Platform, TouchableOpacity } from 'react-native'; 
import React, { useLayoutEffect, useState } from 'react';
import { Button, Input, Icon, Avatar } from '@rneui/themed';
import { KeyboardAvoidingView } from 'react-native';
import styles from '../styles/SignUpScreenStyle';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  

        return updateProfile(user, {
          displayName: name
        }).then(() => {
          console.log("User registered with name:", user.displayName);
          navigation.navigate('Home');
        });
      })
      .catch((error) => {
        console.error("Error registering user:", error.code, error.message);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to login",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.inputContainer}>
        <Input 
          placeholder="Email" 
          autoFocus 
          type="email" 
          value={email}
          onChangeText={text => setEmail(text)} 
        />
        <Input 
          placeholder="Name" 
          type="text"
          value={name}
          onChangeText={text => setName(text)} 
        />
        <Input 
          placeholder="Password" 
          secureTextEntry 
          type="password"  
          value={password}
          onChangeText={text => setPassword(text)} 
        />
        <Input 
          placeholder="Confirm Password" 
          secureTextEntry 
          type="password"  
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
      </View>

      <View style={{ alignItems: 'center' }}>
        <Button 
          containerStyle={styles.button} 
          title="Register" 
          type="solid" 
          onPress={handleRegister} 
        />

        <View style={{ height: 10 }} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
