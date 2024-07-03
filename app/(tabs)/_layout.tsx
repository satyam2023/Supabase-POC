import { Stack, Tabs, useRouter } from "expo-router"
import { Pressable,Text } from "react-native";
import { supabase } from "../../supabse";

const layout=()=>{
 const router =useRouter();
  const signOutUser=async()=>{
    try{
    await supabase.auth.signOut();
     // router.replace('(signUp)')
    }
    catch(e){
     console.error(e);
    }
  }
  return(
    <>
    <Stack.Screen/>
    <Tabs screenOptions={{
    
      lazy: true,
    // headerRight:()=><Pressable
    // onPress={signOutUser}><Text>SignOut</Text></Pressable>
    }  
    }>
      <Tabs.Screen
      name="ToDoList"
      
      />
      <Tabs.Screen
      name="ScoreCard"
      />
    </Tabs>
    </>
  )
}

export default layout;