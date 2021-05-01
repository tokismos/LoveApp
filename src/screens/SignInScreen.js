import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AuthForm from "../components/AuthForm";
import { signIn } from "../helpers/db";

const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <AuthForm title="Sign IN" onSubmit={signIn} />
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.bottomText}>Dont have an account?Sign up !!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: 150,
    justifyContent: "center",
  },
  bottomText: { alignSelf: "center" },
});
