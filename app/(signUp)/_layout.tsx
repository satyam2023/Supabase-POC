import React, { useRef, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import TextField from "../../component/TextInput";
import { supabase } from "../../supabse";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { setUserEmail, storeToken } from "../../utils/helper";
const SignLogInScreen = () => {
  const [signUpStatus, setSignUpStatus] = useState<boolean>(true);
  const router=useNavigation() as unknown as NativeStackNavigationProp<any>;
  const details = {
    name: useRef<string>(""),
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

  const signIn=async()=>{
    const res= await supabase.auth.signInWithPassword({
      email: details.email.current,
      password: details.password.current,
    })

    console.log("Result sigin::::",res);
    if(res.error==null)
    {
     storeToken(res.data.session?.access_token);
     setUserEmail(res?.data?.user?.email)
     router.navigate('(tabs)')
    }
    
  }


  

  return (
    <SafeAreaView >
      <View style={{ paddingHorizontal: 20 }}>
      <TextField
        placeholder={"Enter Email"}
        onChangeText={(text: string) => (details.email.current = text)}
      />
      <TextField
        placeholder={"Enter Password"}
        onChangeText={(text: string) => (details.password.current = text)}
      />
      <Pressable onPress={() => ( signUpStatus &&   details?.password?.current.length>5)?signUpWithEmail():signIn()} style={style.btn}>
        <Text>{signUpStatus ? "SignUp" : "SignIn"}</Text>
      </Pressable>
      <Pressable
        style={style.btn}
        onPress={() => setSignUpStatus(!signUpStatus)}
      >
        <Text>
          {`Already have a Account ?  ${
            signUpStatus ? "Sign In" : "Sign Up"
          }`}
        </Text>
      </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignLogInScreen;

const style = StyleSheet.create({
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
