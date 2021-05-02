import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";

const AuthForm = ({ title, onSubmit, isSignInScreen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.textInput}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.button}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title={title} onPress={() => onSubmit(email, password)} />
          )}
        </View>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    height: 300,
    margin: 20,
    padding: 10,
    justifyContent: "space-between",
  },
  autoLogin: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },

  title: { fontSize: 25, alignSelf: "center", fontWeight: "bold" },
  textInput: { borderWidth: 1, margin: 5, fontSize: 20, padding: 10 },
  button: { marginTop: 10 },
});
