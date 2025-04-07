import { View } from 'react-native'; 
import React, { useState } from 'react';
import { Button, Input, Image } from '@rneui/themed';
import { KeyboardAvoidingView } from 'react-native';
import styles from '../styles/LogInScreenStyle';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in:", user.email);
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error("Login failed:", error.code, error.message);
        alert("Invalid credentials or network issue");
      });
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image
        source={require('../assets/fanshawe-icon.png')}
        style={{ width: 200, height: 200 }}
      />

      <View style={styles.inputContainer}>
        <Input 
          placeholder="Email" 
          autoFocus 
          type="email" 
          value={email}
          onChangeText={(text) => setEmail(text)} 
        />
        <Input 
          placeholder="Password" 
          secureTextEntry 
          type="password"   
          value={password}
          onChangeText={(text) => setPassword(text)} 
        />
      </View>

      <View style={{ alignItems: 'center' }}>
        <Button 
          containerStyle={styles.button} 
          buttonStyle={styles.solidButton}  
          title="Login" 
          type="solid" 
          onPress={handleLogin} 
        />
        <Button 
          containerStyle={styles.button} 
          titleStyle={styles.clearButtonTitle} 
          title="Register" 
          type="clear" 
          onPress={goToSignUp} 
        />
        <View style={{ height: 10 }} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
