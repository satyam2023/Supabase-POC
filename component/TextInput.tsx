import { TextInput, View, Text, StyleSheet, ViewStyle } from "react-native";

interface TextInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value?: string;
}
const TextField = ({ placeholder, onChangeText, value }: TextInputProps) => {
  return (
    <View style={{ marginTop: 16 }}>
      <Text>{placeholder}</Text>
      <TextInput
        onChangeText={(text: string) => {
          onChangeText(text);
        }}
        style={styles.textContainer}
        defaultValue={value}
      />
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create<{ textContainer: ViewStyle }>({
  textContainer: {
    borderRadius: 10,
    borderColor: "#2E8A466B",
    borderWidth: 2,
    height: 56,
    width: "100%",
    marginTop: 16,
    paddingHorizontal: 10,
  },
});
