import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  Image,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const backgroundImage = require("../assets/images/bgi-2x.jpg");

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove();
  }, []);

  const onSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    console.log(state);
  };

  const keyboardShow = () => {
    setIsShowKeyboard(true);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const linkHandler = () => {
    navigation.navigate("Registration");
  };

  const changeEmailInputHandler = (value) => {
    setState((prevState) => ({ ...prevState, email: value }));
  };

  const changePasswordInputHandler = (value) => {
    setState((prevState) => ({ ...prevState, password: value }));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <StatusBar style="auto" />
          <View style={styles.bgContainer} width={dimensions}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.form} width={dimensions - 16 * 2}>
                <Text style={styles.header}>Login</Text>
                <TextInput
                  value={state.email}
                  onChangeText={changeEmailInputHandler}
                  onFocus={keyboardShow}
                  placeholder="Email"
                  keyboardType="email-address"
                  style={styles.input}
                />
                <TextInput
                  value={state.password}
                  onChangeText={changePasswordInputHandler}
                  onFocus={keyboardShow}
                  placeholder="Password"
                  secureTextEntry={true}
                  style={{
                    ...styles.input,
                    marginBottom: isShowKeyboard ? 32 : 43,
                  }}
                />

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.btnSubmit}
                  onPress={onSubmit}
                >
                  <Text style={styles.btnTitle}>Sign in</Text>
                </TouchableOpacity>
              </View>
              {!isShowKeyboard && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.link}
                  onPress={linkHandler}
                >
                  <Text style={styles.text}>
                    If you don`t have an account, please{" "}
                    <Text Text style={styles.linkText}>
                      Sign up.
                    </Text>
                  </Text>
                </TouchableOpacity>
              )}
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bgContainer: {
    position: "relative",
    alignItems: "center",
    marginTop: 323,
    paddingTop: 32,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    justifyContent: "center",
  },
  header: {
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    backgroundColor: "transparent",
  },
  input: {
    height: 50,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 16,
    color: "#212121",
  },
  btnSubmit: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFF",
  },
  link: {
    alignItems: "center",
    marginBottom: 111,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  linkText: {
    fontFamily: "Roboto-Medium",
    textDecorationLine: "underline",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
