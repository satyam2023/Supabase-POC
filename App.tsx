import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getToken } from './utils/helper';
import { useRouter } from 'expo-router';

export default function App() {
 const router=useRouter();
  const handleNavigation=async()=>{
    const value=await getToken();
    if(value?.length)
    router.navigate('(tabs)')
  }
useEffect(()=>{
  handleNavigation()
},[])

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
