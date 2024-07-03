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
import { CONST_STRING } from "../../libs/constant";
import { IScore } from "../../models/Interface";

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
    } catch (e) {
      console.error(e);
    } 
  };

  useEffect(() => {
    fetchResolvetable();
  });
const renderItem=({item,index}:{item:IScore,index:number})=>{
      
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 30 }}>
        <TextField
          placeholder={CONST_STRING.ENTER_NAME}
          onChangeText={(value: string) => (scoreDetails.name.current = value)}
        />
        <TextField
          placeholder={CONST_STRING.ENTER_SCORE}
          onChangeText={(value: string) => (scoreDetails.score.current = value)}
        />
        <TouchableOpacity onPress={addScore}>
          <Text style={{ alignSelf: "center", marginTop: 10 }}>{CONST_STRING.ADD_SCORE}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ScoreCard;
