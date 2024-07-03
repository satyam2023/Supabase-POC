import { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { supabase } from "../../supabse";
import TextField from "../../component/TextInput";

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

    console.log("Data::::", data);
    console.log("Error::::", error);
  };

  const fetchLocation = async () => {
    const { data, error } = await supabase.storage.getBucket('bucket');
    if (error) console.error(error);
    else console.log("All Buckets:::", data);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const addLocation = async () => {
    setAddLocationStatus(!addLocationStatus);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Add Location</Text>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#E6E6E6",
              borderRadius: 10,
            }}
            onPress={addLocation}
          >
            <Text style={{ fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>
        {addLocationStatus && (
          <>
            <TextField
              placeholder={"Enter Location"}
              onChangeText={(text: string) => (details.location.current = text)}
            />
            <TouchableOpacity
              onPress={addLocality}
              style={{ alignSelf: "center", padding: 10 }}
            >
              <Text>ADD</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default StoreItem;
