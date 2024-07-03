import { useNavigation } from "expo-router";

import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { CONST_STRING, ROUTES } from "../libs/constant";

export default function Page() {
  const route = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => route.navigate(ROUTES.SIGNUP as never)}
      style={styles.container}
    >
      <Text style={styles.title}>{CONST_STRING.GO_TO_SIGN_LOG}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create<{ container: ViewStyle; title: TextStyle }>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    padding: 10,
    backgroundColor: "#478987",
    borderRadius: 10,
    fontSize: 20,
  },
});
