import { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet
} from "react-native";
import { supabase } from "../../supabse";
import TextField from "../../component/TextInput";
import { CONST_STRING } from "../../libs/constant";
import { IStoreStyle } from "../../models/Interface";

const StoreItem = () => {
  const details = {
    location: useRef<string>(""),
  };
  const [location, setLocation] = useState();
  const [addLocationStatus, setAddLocationStatus] = useState<boolean>(false);

  const addLocality = async () => {
    const { data, error } = await supabase.storage.createBucket(
      details.location.current,
      {
        public: true,
        allowedMimeTypes: ["image/png"],
        fileSizeLimit: 1024,
      }
    );

  };

  const fetchLocation = async () => {

  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const addLocation = async () => {
    setAddLocationStatus(!addLocationStatus);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{paddingHorizontal: 20 }}>
        <View
          style={styles.container}
        >
          <Text style={{ fontSize: 20 }}>{CONST_STRING.ADD_LOCATION}</Text>
          <TouchableOpacity
            style={styles.addLocationBtn}
            onPress={addLocation}
          >
            <Text style={{ fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>
        {addLocationStatus && (
          <>
            <TextField
              placeholder={CONST_STRING.ENTER_LOCATION}
              onChangeText={(text: string) => (details.location.current = text)}
            />
            <TouchableOpacity
              onPress={addLocality}
              style={{ alignSelf: "center", padding: 10 }}
            >
              <Text>{CONST_STRING.ADD}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default StoreItem;

const styles=StyleSheet.create<IStoreStyle>({
  addLocationBtn:{
      padding: 10,
      backgroundColor: "#E6E6E6",
      borderRadius: 10,
  },
  container:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  }
})
