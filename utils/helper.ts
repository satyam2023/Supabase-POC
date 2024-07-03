import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (value: string | undefined) => {
  try {
    await AsyncStorage.setItem("token", value as string);
  } catch (e) {
    console.error("Errorin storing token in Async Storage", e);
  }
};

export const setUserEmail = async (value: string | undefined) => {
  try {
    await AsyncStorage.setItem("email", value as string);
  } catch (e) {
    console.error("Errorin storing token in Async Storage", e);
  }
};

export const getToken = async () => {
  try {
    const tokenValue = await AsyncStorage.getItem("token");
    return tokenValue;
  } catch (e) {
    console.error("Error in fetching  token from Async Storage", e);
  }
};

export const getUserEmail = async () => {
  try {
    const email = await AsyncStorage.getItem("email");
    console.log("Email in async ",email);
    return email;
  } catch (e) {
    console.error("Error in fetching  token from Async Storage", e);
  }
};
