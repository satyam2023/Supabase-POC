import { Stack, Tabs, useRouter } from "expo-router"
import { supabase } from "../../supabse";
import { ROUTES } from "../../libs/constant";

const layout=()=>{
 const router =useRouter();
  const signOutUser=async()=>{
    try{
    await supabase.auth.signOut();
     router.replace(ROUTES.SIGNUP)
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