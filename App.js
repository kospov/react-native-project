import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
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
import AddAvatarIcon from "./assets/Components/AddAvatarIcon.jsx";
import EditAvatarIcon from "./assets/Components/EditAvatarIcon.jsx";

const backgroundImage = require("./assets/images/bgi-2x.jpg");

// temporary avatar example
const avatarImage = require("./assets/images/avatarImage-2x.png");

const initialState = {
  login: "",
  email: "",
  password: "",
};

const usedFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  "Inter-Medium": require("./assets/fonts/Inter/Inter-Medium.ttf"),
};

export default function App() {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(usedFonts);
      } catch (e) {
        console.log(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    const onChange = () => {
      const width = Dimensions.get("window").width;
      console.log(width);
      setDimensions(width);
    };

    prepare();

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const onSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    console.log(state);
  };

  const onPressBtn = () => {
    // temporary plug
    state.login ? console.log("Edit avatar") : console.log("Add avatar");
  };

  const keyboardShow = () => {
    setIsShowKeyboard(true);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const linkHandler = () => {
    // temporary plug
    console.log("Open LoginScreen");
  };

  const changeLoginInputHandler = (value) => {
    setState((prevState) => ({ ...prevState, login: value }));
  };

  const changeEmailInputHandler = (value) => {
    setState((prevState) => ({ ...prevState, email: value }));
  };

  const changePasswordInputHandler = (value) => {
    setState((prevState) => ({ ...prevState, password: value }));
  };

  return (
    <TouchableWithoutFeedback
      onPress={keyboardHide}
      onLayout={onLayoutRootView}
    >
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
              <View
                style={styles.avatarThumb}
                // half window width minus padding minus half avatar width
                marginHorizontal={dimensions / 2 - 16 - 120 / 2}
              >
                <Image
                  source={state.login && avatarImage}
                  style={styles.avatar}
                ></Image>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    ...styles.btnAvatar,
                    right: state.login ? -19 : -13,
                    bottom: state.login ? 9 : 14,
                  }}
                  onPress={onPressBtn}
                >
                  {state.login ? <EditAvatarIcon /> : <AddAvatarIcon />}
                </TouchableOpacity>
              </View>
              <View style={styles.form} width={dimensions - 16 * 2}>
                <Text style={styles.header}>Registration</Text>
                <TextInput
                  value={state.login}
                  onChangeText={changeLoginInputHandler}
                  onFocus={keyboardShow}
                  placeholder="Login"
                  style={styles.input}
                />
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
                  <Text style={styles.btnTitle}>Sign up</Text>
                </TouchableOpacity>
              </View>
              {!isShowKeyboard && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.link}
                  onPress={linkHandler}
                >
                  <Text style={styles.text}>
                    If you already have an account, just{" "}
                    <Text Text style={styles.linkText}>
                      Sign in.
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
    marginTop: 263,
    paddingTop: 92,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarThumb: {
    position: "absolute",
    top: -152,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatar: {
    width: 120,
    height: 120,
  },
  btnAvatar: {
    position: "absolute",
    // right and bottom are used by inline
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
    marginBottom: 45,
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
