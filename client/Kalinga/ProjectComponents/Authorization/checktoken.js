import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { CommonActions } from '@react-navigation/native';

export const CheckToken = async ({ navigation, message }) => {
  console.log("Message: ", message);
  if (message === "Unauthorized User") {
    console.log("Message: ", message);
    await AsyncStorage.multiRemove(['token', 'userInformation', 'DPLink', 'Image_ID']);
    Alert.alert("Session Expired", "Your session has expired. Please log in again.", [
      {
        text: "OK",
        onPress: () =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'LogIn' }],
            })
          ),
      },
    ]);
    return;
  }
};

export const getToken = async () => {
  const token = AsyncStorage.getItem("token")
  if(token) return token
  else return null
}


export const logOutUser = async ({navigation}) => {
      await AsyncStorage.multiRemove(['token', 'userInformation', 'DPLink', 'Image_ID']);
      Alert.alert("Session Expired", "Your session has expired. Please log in again.", [
        {
          text: "OK",
          onPress: () =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'LogIn' }],
              })
            ),
        },
      ]);
      return;
}