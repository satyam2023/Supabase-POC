import React, { MutableRefObject, useRef, useState } from "react";
import { Alert, Pressable, Text, View, ViewStyle } from "react-native";
import TextField from "../../component/TextInput";
import { supabase } from "../../supabse";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { setUserEmail, storeToken } from "../../utils/helper";
import { CONST_STRING, ROUTES } from "../../libs/constant";
import { IUserDetails } from "../../models/Interface";
const SignLogInScreen = () => {
  const [signUpStatus, setSignUpStatus] = useState<boolean>(true);
  const router = useNavigation() as unknown as NativeStackNavigationProp<any>;
  const details: IUserDetails= {
    email: useRef<string>(""),
    password: useRef<string>(""),
  };
  async function signUpWithEmail() {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: details.email.current,
      password: details.password.current,
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
  }

  const signIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email: details.email.current,
      password: details.password.current,
    });
    if (res.error == null) {
      storeToken(res.data.session?.access_token);
      setUserEmail(res?.data?.user?.email);
      router.navigate(ROUTES.TABS);
    }
  };

  const handlePressEvent = () => {
    signUpStatus && details?.password?.current.length > 5
      ? signUpWithEmail()
      : signIn();
  };

  const btnText = signUpStatus ? CONST_STRING.SIGNUP : CONST_STRING.SIGNIN;
  const handleSignUpStatus = () => setSignUpStatus(!signUpStatus);

  const handleTextInput = (id: number, text: string) => {
    details[Object.keys(details)[id]].current = text;
  };

  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 20 }}>
        {[CONST_STRING.ENTER_EMAIL, CONST_STRING.ENTER_PASS].map(
          (item: string, index: number) => {
            return (
              <TextField
                key={index}
                placeholder={item}
                onChangeText={(text: string) => handleTextInput(index, text)}
              />
            );
          }
        )}
        <Pressable onPress={handlePressEvent} style={style.btn}>
          <Text>{btnText}</Text>
        </Pressable>
        <Pressable style={style.btn} onPress={handleSignUpStatus}>
          <Text>{`${CONST_STRING.ALREADY_ACC}${btnText}`}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignLogInScreen;

const style = StyleSheet.create<{ btn: ViewStyle }>({
  btn: {
    padding: 10,
    height: 56,
    backgroundColor: "#2E8A466B",
    borderRadius: 15,
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
