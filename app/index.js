import { useNavigation } from "expo-router";

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ROUTES } from "../libs/constant";





export default function Page() {
  const route = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => route.navigate('(signUp)')}
      style={styles.container}
    >
      <Text style={styles.title}>Go to SignUp or Login Screen</Text>
    </TouchableOpacity>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    padding: 10,
    backgroundColor: "#478987",
    borderRadius: 10,
    fontSize:20
  },
});
