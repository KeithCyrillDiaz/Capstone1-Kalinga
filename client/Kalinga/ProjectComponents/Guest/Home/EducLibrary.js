//Guest EducLibrary
import React from "react";
import { 
  ScrollView, 
  Text, View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { globalStyles } from "../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../styles_kit/globalHeader.js";
import { Linking } from 'react-native';

const GuestEducLibrary = () => {

  const educationLibraryCategories = [
    {
      title: 'How to Coordinate with Ouezon CIty Human Milk Bank',
      link: 'https://www.qcgh.org/hmb.html',
    },
    {
      title: 'Usual Human Milk Bank Process',
      link: 'https://hmb.ph/milkProcessing.php',
    },
    {
      title: 'How A Milk Bank is Run',
      link: 'https://hmb.ph/howItRun.php',
    },
    {
      title: 'Medication and donating breastmilk',
      link: 'https://hmb.ph/medication.php',
    },
    {
      title: 'Benefits of Breastmilk and Donor Breastmilk',
      link: 'https://hmb.ph/benefits.php',
    },
    {
      title: 'Dispelling Donor Milk Myths',
      link: 'https://hmb.ph/dispellMyths.php',
    },
    {
      title: 'Storing and Delivering of BreastMilks',
      link: 'https://hmb.ph/storingDelivering.php',
    },
    
  ];
  const handlePress = (link) => {
    Linking.openURL(link);
  };

  return (
    <SafeAreaView style={globalStyles.SafeArea}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
      <View style={globalHeader.SmallHeader}>
        <Text style={globalHeader.SmallHeaderTitle}>Education Library</Text>
      </View>

      <ScrollView style={globalStyles.ScrollView}>
        <View style={styles.flex_start}>
          <Text style={globalStyles.titleParagraph}>Categories</Text>
        </View>

        <View style={styles.container}>
          {educationLibraryCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[globalStyles.EducLibraryBox, styles.touchableOpacity]}
              onPress={() => handlePress(category.link)}
            >
              <View style={styles.overlay}>
                <Text style={globalStyles.EducLibraryBox_Title}>
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      backgroundColor: '#FFE7DA',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },

    flex_start: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
      marginLeft: "5%",
      marginVertical: "2.5%"
    }

  })

  export default GuestEducLibrary;

  