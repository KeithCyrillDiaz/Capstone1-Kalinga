//Guest EducLibrary
import React, {useState} from "react";
import { 
  ScrollView, 
  Text, View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const ForumPage = () => {


  //const { width, height } = Dimensions.get('window');

    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const [isCommentVisible, setIsCommentVisible] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

  const handleHeartClick = () => {
      setIsHeartClicked(!isHeartClicked); 
    };

    const handleCommentClick = () => {
        setIsCommentVisible(!isCommentVisible);
    };

    const handleCommentChange = (text) => {
        setCommentText(text);
    };

    const handleAddComment = () => {
        if (commentText.trim() !== '') {
            setComments([...comments, commentText]);
            setCommentText('');
        }
    };
    

  
  const FirstParagraph = 'Im searching for the best containers to store breast milk. Any recommendations for easy-to-use, durable, and freezer-safe options?'

  const SecondParagraph = ''

  const ThridParagraph = ''

  return (
      <SafeAreaView style = {globalStyles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Forum</Text>
            </View>

            <View style = {styles.ForumContainer}>
                <FontAwesome name="user-circle-o" size={40} color="#E60965" />
                <TextInput
                 style={styles.inputField}
                 //value={message}
                 //onChangeText={setMessage}
                 placeholder="Search"
                 placeholderTextColor="#E60965"
                 //onSubmitEditing={handleMessageSend}
                 //returnKeyType="send"
                />
                <MaterialIcons name="post-add" size={50} color="#E60965" />
              </View>

          <ScrollView
           style = {globalStyles.ScrollView}
           overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
           nestedScrollEnabled={true} // Enable nested scrolling
           
           >
            <View style = {styles.container}>
                <View style = {styles.Box}>
                    <View style = {styles.flex_start}>
                            <FontAwesome name="user-circle-o" size={40} color="#E60965" />
                            <View>
                                <Text style = {styles.Name}>
                                        Beverly Somodio
                                </Text>
                              
                                <View style = {styles.flex_Row}>
                                    <MaterialIcons name="verified" size={14} color="#E60965"/>
                                    <Text style = {styles.UserType}>
                                        Requestor
                                    </Text>
                                </View>
                            </View>
                            
                    </View>
                            <Text style = {styles.content}>
                                {FirstParagraph}
                            </Text>
                </View>
                        <View style = {styles.reactionContainer}>
                            <View style={styles.reactionContainer}>
                                <View style = {styles.reactionLeftBox}>
                                    <TouchableOpacity onPress={handleHeartClick}>
                                        <AntDesign name={isHeartClicked ? "heart" : "hearto"} size={24} color="#E60965" />
                                    </TouchableOpacity>
                                    <Text style = {styles.ReactsLeftLabel}>
                                        Love
                                    </Text>
                                </View>
                            </View>
                                <View style={styles.reactionContainer}>
                                    <View style = {styles.reactionRightBox}>
                                        <TouchableOpacity onPress={handleCommentClick}>
                                            <Feather name="message-circle" size={24} color="#E60965" />
                                        </TouchableOpacity>
                                        <Text style={styles.ReactsLabel}>Comments</Text>
                                    </View> 
                                </View>
                                
                        </View>
                        {isCommentVisible &&
                            <ScrollView>
                                 <View style = {styles.commentOutputBox}>
                                    {comments.map((comment, index) => (
                                        <View key={index}>
                                            
                                            <View style = {styles.flex_start}>
                                                <FontAwesome name="user-circle-o" size={40} color="#E60965" />
                                                <View>
                                                    <Text style = {styles.Name}>
                                                            Beverly Somodio
                                                    </Text>
                                                
                                                    <View style = {styles.flex_Row}>
                                                        <MaterialIcons name="verified" size={14} color="#E60965"/>
                                                        <Text style = {styles.UserType}>
                                                            Requestor
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.commentInput}>
                                                                {comment}
                                                        </Text>
                                                    </View>
                                                </View>
                                                
                                            </View>

                                            
                                        </View>
                                    ))}
                                </View>
                                <View style = {styles.Row}>
                                    <View style = {styles.commentContainer}>
                                        <TextInput
                                            style={styles.commentInput}
                                            placeholder="Write a comment..."
                                            placeholderTextColor="#E60965"
                                            onChangeText={handleCommentChange}
                                            value={commentText}

                                        />
                                    
                                    </View>
                                    <TouchableOpacity onPress={handleAddComment}>
                                        <Ionicons name="send" size={24} color="#E60965" />
                                    </TouchableOpacity>
                                </View>
                               
                               
                            </ScrollView>
                         
                        }
            </View>
            
            
         </ScrollView>
      </SafeAreaView>

    )
    
  }

  const styles = StyleSheet.create ({


    container: {
        
        //backgroundColor: '#FFE7DA',
        marginVertical: "5%"
     },

     Row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        //backgroundColor: "gray",
        marginHorizontal: 30,
     },

    ForumContainer: {
        flexDirection: "row",
       justifyContent: "center",
       alignItems: "center",
      //backgroundColor: '#FFE7DA',
      //width: '90%',
      borderBottomWidth: 2,
      borderBlockColor: "#FFACC7",
      //maxWidth: "90%"
      marginHorizontal: "6%",
    
    },
    Box: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: '#FFE7DA',
        //width: '90%',
        marginHorizontal: "6%",
        borderWidth: 4,
        borderColor: "#E60965",
        borderRadius: 20,
        paddingVertical: "4%",  
    },

    reactionContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: '#FFE7DA',
       //width: '90%',
       //maxWidth: "90%"
        marginTop: 5,
        marginBottom: 10,
        
    },

    reactionLeftBox: {
        flexDirection: "row",
        paddingHorizontal: 10,
        //borderBottomRightRadius: 20,

       
    },

    reactionRightBox: {
        flexDirection: "row",
 
        paddingHorizontal: 10,
        //borderBottomRightRadius: 20,
    },

    commentContainer: {
        //backgroundColor: "gray",
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor:  "#E60965",
        marginVertical: 10, 
        paddingLeft: 10,
        paddingVertical: 10,
        marginRight: -30,
    },

    commentInput: {
        color: "#E60965",
        fontSize: 15,
        fontFamily: "Open-Sans-Regular",
        marginTop: 10,
        marginLeft: 7,
    },
    commentOutputBox: {
        //backgroundColor: "gray",
        flex: 1,
        marginHorizontal: 30,
        borderTopWidth: 1,
        borderTopColor:  "#E60965",


    },


    flex_start: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginVertical: "2.5%",
      //backgroundColor: "gray",
      width: "95%"
    },

    flex_Row: {
        flexDirection: "row",
        marginHorizontal: "4%",
        alignItems: "center",
    },

    inputField: {
        borderWidth: 1,
        borderColor: "#E60965",
        borderRadius: 30,
        padding: "3%",
        width: "70%",
        marginVertical: "4%",
        color: "#E60965",
        marginHorizontal: "4%"
    },

    Name: {
        color: "#E60965",
        fontFamily: "Open-Sans-Bold",
        fontSize: 15,
        marginHorizontal: "5%",
    },

    UserType: {
        marginHorizontal: "2%",
        color: "#E60965",
        fontFamily: "Open-Sans-Regular",
        fontSize: 15,
    },

    content: {
        fontFamily: 'Open-Sans-Regular',
        fontSize: 15,
        color: "#E60965",
        textAlign: "justify",
        marginTop: 10,
        marginLeft: 50,
        marginRight: 10,
        //backgroundColor: "gray"

    },
    ReactsLabel: {
        fontFamily: "Open-Sans-Bold",
        fontSize: 17,
        color: "#E60965",
        paddingHorizontal: 10,
    },

    ReactsLeftLabel: {
        fontFamily: "Open-Sans-Bold",
        fontSize: 17,
        color: "#E60965",
        paddingHorizontal: 10,

    },

  })

  export default ForumPage;

  