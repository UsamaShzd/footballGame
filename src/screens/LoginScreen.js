import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import firebase from "firebase";
import { Formik } from "formik";
import * as Yup from "yup";

import colors from "../configs/colors";
import fonts from "../configs/fonts";

import LogoHeader from "../components/LogoHeader";
import GradientBackground from "../components/GradientBackground";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import LineText from "../components/LinedText";

//login form schema
const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid Email")
    .required("Email is required")
    .label("Email"),
  password: Yup.string()
    .trim()
    .min(5, "Password must be atleast 5 characters")
    .required("Password is required")
    .label("Password"),
});

//signup form schema
const signupFormSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid Email")
    .required("Email is required")
    .label("Email"),
  password: Yup.string()
    .trim()
    .min(5, "Password must be atleast 5 characters")
    .required("Password is required")
    .label("Password"),
  confirmPassword: Yup.string()
    .trim()
    .required()
    .min(5, "Confirm Password must be atleast 5 characters")
    .oneOf([Yup.ref("password"), null], "Confirm Password must match Password")
    .label("Confirm Password"),
});

const LoginScreen = (props) => {
  const [showLoginLoader, setShowLoginLoader] = useState(false);
  const [showSignupLoader, setShowSignupLoader] = useState(false);
  const [toggleState, setToggleState] = useState("login");

  //////////////////////////////////////////
  ///////// Busines Logic functions ////////
  //////////////////////////////////////////

  const loginFormSubmitHandler = async ({ email, password }) => {
    try {
      setShowLoginLoader(true);

      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (err) {
      Alert.alert("Login Error", err.message);
    } finally {
      //hide loader here
      setShowLoginLoader(false);
    }
  };

  const signupFormSubmitHandler = async ({ email, password }) => {
    try {
      setShowSignupLoader(true);
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (err) {
      Alert.alert("Signup Error", err.message);
    } finally {
      //hide loader here
      setShowSignupLoader(false);
    }
  };

  //////////////////////////////////////////
  ///////// UI rendering functions /////////
  //////////////////////////////////////////

  //login and signup form toggler
  const renderToggler = () => {
    return (
      <View style={styles.toggleContainer}>
        <AppButton
          label="Login"
          containerStyles={
            toggleState === "login"
              ? styles.toggleActiveButton
              : styles.toggleDisabledButton
          }
          labelStyles={
            toggleState !== "login" ? styles.toggleDisabledButtonLabel : {}
          }
          disabled={toggleState === "login"}
          onPress={() => {
            setToggleState("login");
          }}
        />
        <AppButton
          label="Signup"
          containerStyles={
            toggleState === "signup"
              ? styles.toggleActiveButton
              : styles.toggleDisabledButton
          }
          labelStyles={
            toggleState !== "signup" ? styles.toggleDisabledButtonLabel : {}
          }
          disabled={toggleState === "signup"}
          onPress={() => {
            setToggleState("signup");
          }}
        />
      </View>
    );
  };

  //rendering login form
  const renderLoginForm = () => {
    return (
      <View style={styles.formWrapper}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginFormSchema}
          onSubmit={loginFormSubmitHandler}
        >
          {({ values, setFieldValue, touched, errors, handleSubmit }) => {
            return (
              <>
                <AppInput
                  label="E-Mail Address"
                  placeholder="Enter your e-mail"
                  value={values.email}
                  onChangeText={(email) => {
                    setFieldValue("email", email);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={touched.email && errors.email}
                  iconName="email-outline"
                />

                <AppInput
                  label="Password"
                  placeholder="Create your password"
                  value={values.password}
                  onChangeText={(password) => {
                    setFieldValue("password", password);
                  }}
                  error={touched.password && errors.password}
                  iconName="lock-outline"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />

                <AppButton
                  label="Login"
                  containerStyles={{
                    ...styles.toggleActiveButton,
                    width: "100%",
                    marginTop: 30,
                  }}
                  disabled={showLoginLoader}
                  onPress={handleSubmit}
                />
              </>
            );
          }}
        </Formik>
      </View>
    );
  };

  //rendering signup form
  const renderSignupForm = () => {
    return (
      <View style={styles.formWrapper}>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={signupFormSchema}
          onSubmit={signupFormSubmitHandler}
        >
          {({ values, setFieldValue, touched, errors, handleSubmit }) => {
            return (
              <>
                <AppInput
                  label="E-Mail Address"
                  placeholder="Enter your e-mail"
                  value={values.email}
                  onChangeText={(email) => {
                    setFieldValue("email", email);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={touched.email && errors.email}
                  iconName="email-outline"
                />

                <AppInput
                  label="Password"
                  placeholder="Create your password"
                  value={values.password}
                  onChangeText={(password) => {
                    setFieldValue("password", password);
                  }}
                  error={touched.password && errors.password}
                  iconName="lock-outline"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />

                <AppInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={values.confirmPassword}
                  onChangeText={(confirmPassword) => {
                    setFieldValue("confirmPassword", confirmPassword);
                  }}
                  error={touched.confirmPassword && errors.confirmPassword}
                  iconName="lock-outline"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />

                <AppButton
                  label="Signup"
                  containerStyles={{
                    ...styles.toggleActiveButton,
                    width: "100%",
                    marginTop: 30,
                  }}
                  disabled={showSignupLoader}
                  onPress={handleSubmit}
                />
              </>
            );
          }}
        </Formik>
      </View>
    );
  };

  //render Social Login Buttons
  const renderSocialLogin = () => {
    return (
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity
          onPress={() => {
            alert("Google login");
          }}
        >
          <View
            style={[styles.socialButton, { backgroundColor: colors.white }]}
          >
            <Image
              source={require("../assets/GoogleIcon.png")}
              resizeMode="contain"
              style={{ width: 20 }}
            />
            <AppText style={styles.socialLoginBtnText}>Google</AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert("facebook login");
          }}
        >
          <View
            style={[
              styles.socialButton,
              { backgroundColor: colors.facebookBlue },
            ]}
          >
            <Image
              source={require("../assets/FacebookIcon.png")}
              resizeMode="contain"
              style={{ width: 13 }}
            />
            <AppText
              style={{
                ...styles.socialLoginBtnText,
                color: colors.whiteOpacity,
              }}
            >
              Facebook
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  //final render function
  return (
    <View style={styles.screenWrapper}>
      <GradientBackground>
        <LogoHeader />
      </GradientBackground>
      <View style={styles.contentWrapper}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <KeyboardAvoidingView behavior="position">
            <AppText style={styles.welcomeText}>Welcome back to IMINN!</AppText>
            <AppText style={styles.loginText}>
              Lets's Login into your Account!
            </AppText>
            {renderToggler()}
            {toggleState === "login" ? renderLoginForm() : renderSignupForm()}
            <View style={{ paddingHorizontal: 30 }}>
              <LineText>OR USING</LineText>
            </View>
            {renderSocialLogin()}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: -25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  scrollView: { flex: 1 },

  welcomeText: {
    color: colors.primaryOrange,
    textAlign: "center",
    marginTop: 28,
  },
  loginText: {
    alignItems: "center",
    fontSize: 22,
    fontFamily: fonts.NunitoSansBold,
    textAlign: "center",
    marginTop: 15,
  },

  toggleContainer: {
    marginVertical: 20,
    alignSelf: "center",
    backgroundColor: "rgba(255,130,82,0.1)",
    padding: 6,
    width: 325,
    borderRadius: 100,
    flexDirection: "row",
  },

  toggleActiveButton: {
    height: 55,
    width: 157,
  },
  toggleActiveButtonLabel: {},
  toggleDisabledButton: {
    height: 55,
    width: 157,
    backgroundColor: "transparent",
  },
  toggleDisabledButtonLabel: {
    color: colors.primaryOrange,
    fontFamily: fonts.NunitoSans,
  },

  formWrapper: {
    paddingHorizontal: 30,
  },

  socialLoginContainer: {
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 30,
  },

  socialButton: {
    width: 150,
    height: 57,
    borderRadius: 57,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 3,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  socialLoginBtnText: {
    fontFamily: fonts.NunitoSansBold,
    fontSize: 19,
    marginLeft: 10,
  },
});
