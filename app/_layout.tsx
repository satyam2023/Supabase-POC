import { Stack } from "expo-router";

const StackRoute = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(signUp)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default StackRoute;
