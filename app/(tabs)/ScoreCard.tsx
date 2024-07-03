import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../supabse";
import TextField from "../../component/TextInput";
import { getToken } from "../../utils/helper";

const ScoreCard = () => {
  let supavalue;
  const [userId,setUserId]=useState<string>("");
  const [scoreData,setScoreData]=useState<[]>()
  const scoreDetails = {
    name: useRef<string>(""),
    score: useRef<string>(""),
  };

  const addScore = async () => {
    const { data, error } = await supabase
      .from("data")
      .insert({
        user_id:"00b23bf8-4eda-4ee8-945e-c769dc28f7c7",
        name: scoreDetails.name.current,
        score: Number(scoreDetails.score.current),
      });
  };

  const fetchResolvetable = async () => {
    try {
      supavalue = await supabase.from("data").select();
      console.log("ScoreCard value::", supavalue);
    } catch (e) {
      console.error(e);
    } 
  };

  useEffect(() => {
    fetchResolvetable();
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 30 }}>
        <TextField
          placeholder={"Enter Name"}
          onChangeText={(value: string) => (scoreDetails.name.current = value)}
        />
        <TextField
          placeholder={"Enter Score"}
          onChangeText={(value: string) => (scoreDetails.score.current = value)}
        />
        <TouchableOpacity onPress={addScore}>
          <Text style={{ alignSelf: "center", marginTop: 10 }}>ADD Score</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ScoreCard;
