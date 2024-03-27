import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView, Modal, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';
import PopOutInfo from '../../ProjectComponents/InitialScreenPages/PopOutInfo'; 



const Tab = createMaterialTopTabNavigator();

const handleLogIn = () => {
    navigation.navigate('LoginAdmin');
};

const SearchBar = () => {
    return (
        <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Donors"
          placeholderTextColor="#777"
        />
      </View>
    );
  };

const FirstScreen = () => {
    const [popOutVisible, setPopOutVisible] = useState(false);
    const navigation = useNavigation();

    const handleViewPress = () => {
        setPopOutVisible(true);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.tabContent}>
    <SearchBar />
    <View style={styles.DonorContainer}>
        <View style={styles.donorInfoContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoContainer}>
            <Text>Phone Number</Text>
        </View>
    </View>
    <View style={styles.lineContainer}>
                    <View style={styles.line} />
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleViewPress}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
  </View>
  <PopOutInfo visible={popOutVisible} onClose={() => setPopOutVisible(false)} />
    </ScrollView>
 )
};

const SecondScreen = () => {
    const [popOutVisible, setPopOutVisible] = useState(false);
    const navigation = useNavigation();

    const handleViewPress = () => {
        setPopOutVisible(true);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.tabContent}>
    <SearchBar />
    <View style={styles.DonorContainer}>
        <View style={styles.donorInfoContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoContainer}>
            <Text>Phone Number</Text>
        </View>
    </View>
    <View style={styles.lineContainer}>
                    <View style={styles.line} />
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleViewPress}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.DonorSecondContainer}>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Name</Text>
        </View>
        <View style={styles.donorInfoSecondContainer}>
            <Text>Phone Number</Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>View</Text>
        </TouchableOpacity>
    </View>
  </View>
  <PopOutInfo visible={popOutVisible} onClose={() => setPopOutVisible(false)} />
    </ScrollView>
    )
};

const AdminUser = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIcon}>
          <Octicons name="three-bars" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User</Text>
      </View>

      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: '#FFF8EB',
          },
          indicatorStyle: {
            backgroundColor: '#E60965',
          },
        }}
      >
        <Tab.Screen name="Donors" component={FirstScreen} />
        <Tab.Screen name="Requestors" component={SecondScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#E60965',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 20
  },
  headerTitle: {
    fontFamily: 'Kurale-Regular',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    marginLeft: '28%',
  },
  menuIcon: {
    marginLeft: 20,
    marginRight: 20,
},
  tabContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF8EB',
  },
  container:{
    flex: 1,
    backgroundColor: '#FFF8EB',
},
searchContainer: {
    backgroundColor: '#FFF8EB',
    width: '100%',
    paddingVertical: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: '60%',
    transform: [{ translateY: -12 }], 
    color: '#E60965'
  },
  searchInput: {
    flex: 1,
    paddingLeft: 35, // Adjust this value to provide space for the icon
    paddingVertical: 2,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E60965',
    borderRadius: 10,
  },
  DonorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 100
  },
  donorInfoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
    
},
line: {
    borderBottomColor: '#E60965',
    borderBottomWidth: 0.2,
    flex: 1,
},
DonorSecondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 30
},
donorInfoSecondContainer: {
    flex: 1,
  alignItems: 'center',
  },
logInButton: {
    backgroundColor: 'white',
    height: '90%',
    width: "25%",
    borderRadius: 50,
    borderColor: '#E60965',
    borderWidth: 1,
    alignItems: 'center',
},
logInButtonText: {
    color: '#E60965',
    fontSize: 15,

},
scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, 
  },
  popOutContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 300,
    marginHorizontal: 15,
    width: '90%',
    height: '40%',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#E60965",
    borderRadius: 10
    
},
closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E60965',
    borderRadius: 5,
},
FirstPopOutDonorInfo:{
    backgroundColor: 'blue',
    width: '55%'
},
SecondPopOutDonorInfo:{
    backgroundColor: 'red',
    width: '55%'

}
});

export default AdminUser;
