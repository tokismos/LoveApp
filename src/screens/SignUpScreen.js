import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AuthForm from "../components/AuthForm";
import { signUp } from "../helpers/db";
const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <AuthForm title="Sign Up" onSubmit={signUp} />
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.bottomText}>Already have an account? Sign in!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: 150,
    justifyContent: "center",
  },
  bottomText: { alignSelf: "center" },
});
