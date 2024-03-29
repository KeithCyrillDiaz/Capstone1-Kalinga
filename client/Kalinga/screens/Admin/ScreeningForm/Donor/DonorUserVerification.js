import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView, Dimensions, StatusBar } from 'react-native'; // Import Dimensions
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { globalHeader } from '../../../../styles_kit/globalHeader';



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

const UserVerification = () => {
    const navigation = useNavigation();

    const handleViewPress = () => {
        navigation.navigate('DonorInitialScreeningFormPage1');
    };

    const screenWidth = Dimensions.get('window').width; // Get the screen width

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>Set Appointment</Text>
            </View>
            <SearchBar />
            <View styles={styles.title}>
                <Text style={styles.titleText}>Pendings</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.DonorContainer}>
                    <View style={styles.milkBankContainer}>
                      <View style={styles.milkBank}>
                       <FontAwesome name="user-circle-o" size={50} color="#E60965"/>                  
                      </View>
                    </View>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.MilkBankName}>Lorem Ipsum</Text>
                         <Text style={styles.MilkBankLocation}>loremipsum@gmail.com</Text>
                         <Text style={styles.MilkBankPhone}>7/12/2023 8:37pm</Text>
                    </View>
                    <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>View</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Message</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                    
                </View>
            <View style={styles.lineContainer}>
                    <View style={styles.line} />
            </View>

            <View style={styles.DonorContainer}>
                    <View style={styles.milkBankContainer}>
                      <View style={styles.milkBank}>
                       <FontAwesome name="user-circle-o" size={50} color="#E60965"/>                  
                      </View>
                    </View>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.MilkBankName}>Lorem Ipsum</Text>
                         <Text style={styles.MilkBankLocation}>loremipsum@gmail.com</Text>
                         <Text style={styles.MilkBankPhone}>7/12/2023 8:37pm</Text>
                    </View>
                    <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>View</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Message</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                    
                </View>
            <View style={styles.lineContainer}>
                    <View style={styles.line} />
            </View>

            <View style={styles.DonorContainer}>
                    <View style={styles.milkBankContainer}>
                      <View style={styles.milkBank}>
                       <FontAwesome name="user-circle-o" size={50} color="#E60965"/>                  
                      </View>
                    </View>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.MilkBankName}>Lorem Ipsum</Text>
                         <Text style={styles.MilkBankLocation}>loremipsum@gmail.com</Text>
                         <Text style={styles.MilkBankPhone}>7/12/2023 8:37pm</Text>
                    </View>
                    <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>View</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Message</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                    
                </View>
            <View style={styles.lineContainer}>
                    <View style={styles.line} />
            </View>

            <View style={styles.DonorContainer}>
                    <View style={styles.milkBankContainer}>
                      <View style={styles.milkBank}>
                       <FontAwesome name="user-circle-o" size={50} color="#E60965"/>                  
                      </View>
                    </View>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.MilkBankName}>Lorem Ipsum</Text>
                         <Text style={styles.MilkBankLocation}>loremipsum@gmail.com</Text>
                         <Text style={styles.MilkBankPhone}>7/12/2023 8:37pm</Text>
                    </View>
                    <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>View</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Message</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                    
                </View>
            <View style={styles.lineContainer}>
                    <View style={styles.line} />
            </View>

            <View style={styles.DonorContainer}>
                    <View style={styles.milkBankContainer}>
                      <View style={styles.milkBank}>
                       <FontAwesome name="user-circle-o" size={50} color="#E60965"/>                  
                      </View>
                    </View>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.MilkBankName}>Lorem Ipsum</Text>
                         <Text style={styles.MilkBankLocation}>loremipsum@gmail.com</Text>
                         <Text style={styles.MilkBankPhone}>7/12/2023 8:37pm</Text>
                    </View>
                    <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>View</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Message</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                    
                </View>
            <View style={styles.lineContainer}>
                    <View style={styles.line} />
            </View>

            <View style={styles.DonorContainer}>
                    <View style={styles.milkBankContainer}>
                      <View style={styles.milkBank}>
                       <FontAwesome name="user-circle-o" size={50} color="#E60965"/>                  
                      </View>
                    </View>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.MilkBankName}>Lorem Ipsum</Text>
                         <Text style={styles.MilkBankLocation}>loremipsum@gmail.com</Text>
                         <Text style={styles.MilkBankPhone}>7/12/2023 8:37pm</Text>
                    </View>
                    <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>View</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Message</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                    
                </View>
            <View style={styles.lineContainer}>
                    <View style={styles.line} />
            </View>

            <View style={styles.DonorContainer}>
                    <View style={styles.milkBankContainer}>
                      <View style={styles.milkBank}>
                       <FontAwesome name="user-circle-o" size={50} color="#E60965"/>                  
                      </View>
                    </View>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.MilkBankName}>Lorem Ipsum</Text>
                         <Text style={styles.MilkBankLocation}>loremipsum@gmail.com</Text>
                         <Text style={styles.MilkBankPhone}>7/12/2023 8:37pm</Text>
                    </View>
                    <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>View</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Message</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                    
                </View>
            <View style={styles.lineContainer}>
                    <View style={styles.line} />
            </View>

            <View style={styles.DonorContainer}>
                    <View style={styles.milkBankContainer}>
                      <View style={styles.milkBank}>
                       <FontAwesome name="user-circle-o" size={50} color="#E60965"/>                  
                      </View>
                    </View>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.MilkBankName}>Lorem Ipsum</Text>
                         <Text style={styles.MilkBankLocation}>loremipsum@gmail.com</Text>
                         <Text style={styles.MilkBankPhone}>7/12/2023 8:37pm</Text>
                    </View>
                    <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>View</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Message</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                    
                </View>
            <View style={styles.lineContainer}>
                    <View style={styles.line} />
            </View>

            <View style={styles.DonorContainer}>
                    <View style={styles.milkBankContainer}>
                      <View style={styles.milkBank}>
                       <FontAwesome name="user-circle-o" size={50} color="#E60965"/>                  
                      </View>
                    </View>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.MilkBankName}>Lorem Ipsum</Text>
                         <Text style={styles.MilkBankLocation}>loremipsum@gmail.com</Text>
                         <Text style={styles.MilkBankPhone}>7/12/2023 8:37pm</Text>
                    </View>
                    <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>View</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Message</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                    
                </View>
            <View style={styles.lineContainer}>
                    <View style={styles.line} />
            </View>

            <View style={styles.DonorContainer}>
                    <View style={styles.milkBankContainer}>
                      <View style={styles.milkBank}>
                       <FontAwesome name="user-circle-o" size={50} color="#E60965"/>                  
                      </View>
                    </View>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.MilkBankName}>Lorem Ipsum</Text>
                         <Text style={styles.MilkBankLocation}>loremipsum@gmail.com</Text>
                         <Text style={styles.MilkBankPhone}>7/12/2023 8:37pm</Text>
                    </View>
                    <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>View</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Message</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                    
                </View>
            <View style={styles.lineContainer}>
                    <View style={styles.line} />
            </View>

            <View style={styles.DonorContainer}>
                    <View style={styles.milkBankContainer}>
                      <View style={styles.milkBank}>
                       <FontAwesome name="user-circle-o" size={50} color="#E60965"/>                  
                      </View>
                    </View>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.MilkBankName}>Lorem Ipsum</Text>
                         <Text style={styles.MilkBankLocation}>loremipsum@gmail.com</Text>
                         <Text style={styles.MilkBankPhone}>7/12/2023 8:37pm</Text>
                    </View>
                    <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>View</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Message</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                         <Text style={styles.viewButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                    
                </View>
            <View style={styles.lineContainer}>
                    <View style={styles.line} />
            </View>
              
           
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  DonorContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  header: {
    backgroundColor: '#E60965',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 30,
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
  },
  menuIcon: {
    marginLeft: 20,
    marginRight: 20,
},
  tabContent: {
    alignItems: 'center',
    backgroundColor: '#FFF8EB',
  },
  container:{
    flex: 1,
    backgroundColor: '#FFF8EB',
},
InfoContainer:{
  marginTop: 10,
  marginHorizontal: 20
},
milkBankContainer:{
  marginHorizontal: 10
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
  titleText:{
    fontSize: 30,
    marginLeft: 20,
    color: '#E60965',
    fontWeight: '700'
  },
  milkBankList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
},
milkBank: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5, 
    

},

milkBankButton:{
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginLeft: 30
},
milkBankDescription: {
    marginTop: 10,
    textAlign: 'center',
    color: 'black',
   
},
viewButton: {
    backgroundColor: 'white',
    height: 20,
    width: "50%",
    borderRadius: 50,
    borderColor: '#E60965',
    borderWidth: 1,
    alignItems: 'center',
    marginRight: 80,
    marginVertical: 1
    
},
viewButtonText: {
    color: '#E60965',
    fontSize: 15,
},

horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: '#E60965',
    marginTop: -150,
    marginBottom: 10,
},
DescriptionText:
{
    alignItems: 'baseline',
    
},
MilkBankName:{
    fontWeight: '700',
    fontSize: 20,
    color: '#E60965'

},
MilkBankLocation:{
    fontSize: 15,
    color: '#E60965'
},
MilkBankPhone:{
    fontSize: 15,
    color: '#E60965'
},
ButtonContainer:{
    flexDirection: "column",
    marginTop: 10,
    marginHorizontal: 20

},
lineContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 5
},
line: {
  borderBottomColor: '#E60965',
  borderBottomWidth: 0.2,
  flex: 1,
},
    
});

export default UserVerification;
