import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { supabase } from "../../supabse";
import TextField from "../../component/TextInput";
import { View } from "react-native";
import { Link } from "expo-router";

interface Itable {
  id: string;
  Values: string;
  Created_By: string;
  last_updated: string;
  created_at: string;
}

const ToDoList = () => {
  const [toDoList, setTodoList] = useState<Itable[]>([]);
  const [updateItem, setUpdateItem] = useState<number>(-1);
  const [loaderStatus, setLoaderStatus] = useState<boolean>(false);
  const details = useRef<string>("");
  const fetchTodoList = async () => {
    try {
      setLoaderStatus(true);
      const supavalue = await supabase.from("toDo").select();
      supavalue?.data && setTodoList(supavalue?.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaderStatus(false);
    }
  };

  const giveContent = (id: string) => {
    const filteredValue = toDoList.filter((item: Itable) => item.id == id);
    details.current = filteredValue[0].Values;
  };

  const updateCleanUp = () => {
    details.current = "";
    setUpdateItem(-1);
    fetchTodoList();
  };

  const updateTaskItem = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("toDo")
        .update([
          {
            Values: details.current,
            last_updated: new Date(),
          },
        ])
        .eq("id", id);
      updateCleanUp();
    } catch (e) {
      console.error(e);
    }
  };

  const updateValue = async (id: string) => {
    giveContent(id);
    setUpdateItem(Number(id));
  };

  const addTask = async () => {
    if (updateItem != -1) {
      updateTaskItem(updateItem as unknown as string);
    } else {
      const { data, error } = await supabase.from("toDo").insert([
        {
          Values: details.current,
          created_at: new Date(),
        },
      ]);
      updateCleanUp();
    }
  };

  const deleteTask = async (id: string) => {
    const { data, error } = await supabase.from("toDo").delete().eq("id", id);
    fetchTodoList();
  };
  const fetchResolvetable = async () => {
    try {

    //  await supabase.from('resolve_Status').insert([{r_id:42,Resolved:"no",id:87 }])
  const val = await supabase.from("resolve_Status").select();
  // const { data, error } = await supabase
  // .from('toDo')
  // .select(`
  //   id,
  //    resolve_Status(Resolved)
  // `).gt('id',40)
  const { data, error } =  await supabase.rpc('retrieve_new3')

   console.log("value::::",data);

    } catch (e) {
      console.error(e);
    } finally {
      
    }
  };

  useEffect(() => {
    fetchTodoList();
    fetchResolvetable();
  }, []);

  const renderItem = ({ item }: { item: Itable; index: number }) => {
    return (
      <View style={styles.itemContainer}>
        <Text>
          <Text style={styles.headingStyle}>ID: </Text>
          {item.id}
        </Text>
        <Text>
          <Text style={styles.headingStyle}>Values: </Text>
          {item.Values}
        </Text>
        <View style={styles.delUpdContainer}>
          <Pressable style={styles.delBtn} onPress={() => deleteTask(item?.id)}>
            <Text>Delete</Text>
          </Pressable>
          <Pressable
            style={styles.updBtn}
            onPress={() => updateValue(item?.id)}
          >
            <Text>Update</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <View style={{ paddingHorizontal: 40 }}>
          <TextField
            placeholder={"Enter To Do Task"}
            onChangeText={(value: string) => (details.current = value)}
            value={details.current}
          />
          <Pressable style={styles.addBtn} onPress={() => addTask()}>
            <Text> {updateItem != -1 ? "Update" : "Add +"}</Text>
          </Pressable>

        </View>
        {!loaderStatus ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={toDoList}
            renderItem={renderItem}
            style={{ marginTop: 40 }}
          />
        ) : (
          <ActivityIndicator size={"large"} color={"green"} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ToDoList;

const styles = StyleSheet.create({
  addBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E8A8A72",
    padding: 10,
    marginTop: 16,
    borderRadius: 10,
  },
  itemContainer: {
    backgroundColor: "#2E8ACB5B",
    padding: 20,
    marginBottom: 16,
    borderRadius: 20,
  },
  delUpdContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  delBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  updBtn: {
    backgroundColor: "#00EA002D",
    padding: 10,
    borderRadius: 10,
  },
  headingStyle: {
    fontSize: 17,
    fontStyle: "italic",
  },
});
