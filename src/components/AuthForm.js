import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Switch,
  ActivityIndicator,
} from "react-native";
// import { Context as AuthContext } from "../context/AuthContext";

const AuthForm = ({ title, onSubmit, isSignInScreen }) => {
  const [email, setEmail] = useState("tokis@gmail.com");
  const [password, setPassword] = useState("testtest");
  //   const { state } = useContext(AuthContext);
  const [isAuto, setIsAuto] = useState(false);
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
        {
          //show the switch of auto login if we are in the signin screen
          //   isSignInScreen ? (
          //     <View style={styles.autoLogin}>
          //       <Text>Stay Logged ?</Text>
          //       <Switch
          //         trackColor={{ false: "#767577", true: "#81b0ff" }}
          //         thumbColor={isAuto ? "#f5dd4b" : "#f4f3f4"}
          //         onValueChange={() => setIsAuto((value) => !value)}
          //         value={isAuto}
          //       />
          //     </View>
          //   ) : null
        }
        {/* {state.error ? (
          <Text style={{ color: "red" }}>{state.error.message}</Text>
        ) : null} */}
        <View style={styles.button}>
          {/* {state.isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : ( */}
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title={title} onPress={() => onSubmit(email, password)} />
          )}
          {/* )} */}
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
