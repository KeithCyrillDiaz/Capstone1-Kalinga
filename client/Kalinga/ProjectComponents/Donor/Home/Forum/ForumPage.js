//Guest EducLibrary
import React, {useEffect, useState} from "react";
import { 
  ScrollView, 
  Text, 
  View, 
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Alert
} from 'react-native';
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import { BASED_URL } from "../../../../MyConstants.js";
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { Platform } from 'react-native';

const ForumPage = ({route}) => {

    const userInformation = route.params.data

  //const { width, height } = Dimensions.get('window');

   
    const [commentTexts, setCommentTexts] = useState({});
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([])
    const [postContent, setPostContent] = useState('')
    const [comment, setComment] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [likedPosts, setLikedPosts] = useState([]);
    const [openComments, setOpenComments] = useState({});
    const [totalPosts, setTotalPosts] = useState(0);
    const [loadedPosts, setLoadedPosts] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    const fetchDP = async () => {
      const DPLink = await AsyncStorage.getItem("DPLink")
      if(!DPLink && !userInformation.DPLink){
        console.log("DPLink: ", DPLink)
        console.log("userInformation.DPLink: ", userInformation.DPLink)
        return
      } 
      if(!DPLink){
        setProfilePic(userInformation.DPLink)
        console.log("userInformation.DPLink: ", userInformation.DPLink)
      } else{
        setProfilePic(DPLink)
        console.log("DPLink: ", DPLink)
      }
     
    } 

    const nameArray = userInformation.userName.split(" ")

    const firstName = nameArray[0]

    const handleCommentClick = (postId) => {
        setOpenComments((prevOpenComments) => ({
            ...prevOpenComments,
            [postId]: !prevOpenComments[postId], // toggle the state for the clicked post ID
        }));
    };

    const handleHeartClick = (post_ID) => {
        // Check if the post is already liked
        const isLiked = likedPosts.includes(post_ID);
        
        // If liked, remove from liked posts, else add to liked posts
        if (isLiked) {
            setLikedPosts(likedPosts.filter(id => id !== post_ID));
        } else {
            setLikedPosts([...likedPosts, post_ID]);
        }
    };

    const handleAddPost = async () => {
        try{
            setIsLoading(true)
            const userType = userInformation.userType ;
            const owner_ID = userType === "Donor" ? userInformation.Donor_ID : userInformation.Requestor_ID;
            const result = await axios.post(`${BASED_URL}/kalinga/addPost`,{
                ownerID: owner_ID,
                content: postContent,
                userType: userType
            })
            console.log(result.data.messages.message)
            setIsModalOpen(false)
            Alert.alert('Waiting for Admin Approval', 'Your post is being processed by the admin. It will be posted once approved.');
            fetchPost();
        } catch(error) {
            if(error)Alert.alert('Network error', `Please check your internet connection`)
            else
            Alert.alert('Something went wrong', "Please try again later")
        } finally {
            setIsLoading(false)
        }
        
    }

    const handleCommentChange = (text, post_ID) => {
        setCommentTexts((prevCommentTexts) => ({
            ...prevCommentTexts,
            [post_ID]: text, // Update the comment text for the specified post ID
        }));
        setComment(text)
    };
    
    const handleAddComment = async (post_ID, content) => {
        console.log("content: ", content)
        if(comment === "" || (content === ""|| !content)) return
        if (content.trim() !== '') {
            const newComment = {post_ID: post_ID, content: content};
            setComments(prevComments => [...prevComments, newComment]);
            setCommentTexts('');
        }
        console.log(post_ID)
        console.log(comment)

        const userType = userInformation.userType ;

        const owner_ID = userType === "Donor" ? userInformation.Donor_ID : userInformation.Requestor_ID;
        const result = await axios.post(`${BASED_URL}/kalinga/addComment`,{
            post_ID: post_ID,
            ownerID: owner_ID,
            content: comment,
            userType: userType
        })
        if(result.data.messages.code === 0){
            console.log("Success")
        }
    };

    const fetchAsyncData = async () => {
        const stringifyUserInformation = await AsyncStorage.getItem("userInformation")
        if(!stringifyUserInformation){
            await AsyncStorage.setItem("userInformation", JSON.stringify(userInformation))
        } 
    }
    
    const fetchPost = async () => {
        try{
            setIsLoading(true)
            const response = await axios.get(`${BASED_URL}/kalinga/getPosts`)
            const posts = response.data.posts
            setPosts(posts)
            setTotalPosts(posts.length)
            setLoadedPosts(posts.length)
        } catch(error) {
            if(error)Alert.alert('Network error', `Please check your internet connection`)
            else
            Alert.alert('Something went wrong', "Please try again later")
        } finally {
            setIsLoading(false)
        }
       
    }

    const handleScrollRefresh = (event) => {
        const { layoutMeasurement, contentSize, contentOffset } = event.nativeEvent;

  // Calculate the maximum scrollable offset
        const maxOffset = contentSize.height - layoutMeasurement.height;

        // If the user has reached the bottom, trigger refresh
        if (contentOffset.y >= maxOffset) {
            console.log("Refresh");
            setComments([]);
            fetchPost();
            fetchAsyncData();
        }
      };
      
    useFocusEffect(
        React.useCallback(() => {
         fetchPost(); // Fetch profile picture whenever screen comes into focus
         fetchAsyncData();
         fetchDP();
         console.log("comments: ", comments)
        }, [])
      );

  return (
        <View 
            style={{ flex: 1, backgroundColor: '#f5f5f5',}} 
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on platform
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Adjust vertical offset if needed
        >
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Forum</Text>
            </View>
            
            <View style = {[styles.ForumContainer, { justifyContent:"space-between", paddingHorizontal:7, paddingVertical:7}]}>
                {/* <View style={{flexDirection: "row", alignItems: "center", gap:7}}> */}
                    { profilePic === "" 
                        ?<FontAwesome name="user-circle-o" size={40} color="#E60965" />
                        : <Image
                            source = {{uri: profilePic}}
                            style = {{
                                width: 45,
                                height: 45,
                                borderWidth: 1,
                                borderRadius: 100,
                                borderColor: "#E60965",
                            }}
                        />
                    }
                    {/* <TextInput
                    style={styles.inputField}
                    //value={message}
                    //onChangeText={setMessage}
                    placeholder="Search"
                    placeholderTextColor="#E60965"
                    //onSubmitEditing={handleMessageSend}
                    //returnKeyType="send"
                    /> */}
                    <TouchableOpacity onPress={() => setIsModalOpen(true)} >
                        <Text style = {{marginTop:10, fontFamily: "Kurale", fontSize: 15, width: 170, textAlign: "center", color: "#E60965"}}>What's on your mind {firstName}?</Text>
                    </TouchableOpacity>
                    
                {/* </View> */}
                <TouchableOpacity onPress={() => setIsModalOpen(true)} >
                    <MaterialIcons name="post-add" size={50} color="#E60965" />
                </TouchableOpacity>
              
            </View>
            <FlatList
            overScrollMode="never"
            onScroll={handleScrollRefresh} 
            scrollEventThrottle={16}
            // style = {{backgroundColor: "yellow", }}
            data={posts}
            renderItem={({ item }) => (
                <>
                    <View style = {[styles.Box]}>
                        <View style = {styles.flex_start}>
                            { ((!item.DonorOwnerID || !item.DonorOwnerID.DPLink) &&
                                (!item.RequestorOwnerID || !item.RequestorOwnerID.DPLink))
                                ?<FontAwesome name="user-circle-o" size={40} color="#E60965" />
                                : item.DonorOwnerID && item.DonorOwnerID.DPLink 
                                ?  <Image
                                    source = {{uri: item.DonorOwnerID.DPLink}}
                                    style = {{
                                        width: 45,
                                        height: 45,
                                        borderWidth: 1,
                                        borderRadius: 100,
                                        borderColor: "#E60965",
                                    }} 
                                />
                                : item.RequestorOwnerID && item.RequestorOwnerID.DPLink 
                                && <Image
                                        source = {{uri: item.RequestorOwnerID.DPLink}}
                                        style = {{
                                            width: 45,
                                            height: 45,
                                            borderWidth: 1,
                                            borderRadius: 100,
                                            borderColor: "#E60965",
                                        }} 
                                    />
                                }
                                <View>
                                    <Text style = {styles.Name}>
                                            {
                                            item.DonorOwnerID && item.DonorOwnerID.userName
                                            ? item.DonorOwnerID.userName 
                                            : item.RequestorOwnerID && item.RequestorOwnerID.userName  
                                            }
                                    </Text>
                                
                                    <View style = {styles.flex_Row}>
                                        <MaterialIcons name="verified" size={14} color="#E60965"/>
                                        <Text style = {styles.UserType}>
                                            {
                                            item.DonorOwnerID && item.DonorOwnerID.userType
                                            ? item.DonorOwnerID.userType
                                            : item.RequestorOwnerID && item.RequestorOwnerID.userType   
                                            }
                                        </Text>
                                    </View>
                                </View>
                                
                        </View>
                                <Text style = {[styles.postContent]}>
                                    {item.content}
                                </Text>
                                <View style = {{
                                    flexDirection: "row",
                                    marginHorizontal: "6%",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    marginTop: 10,
                                    marginBottom:5
                                    }}>
                                    <View style={styles.reactionContainer}>
                                        <View style = {styles.reactionLeftBox}>
                                            <TouchableOpacity>
                                            <AntDesign name={likedPosts.includes(item.post_ID) ? "heart" : "hearto"} size={24} color="#E60965" onPress={() => handleHeartClick(item.post_ID)} />
                                            </TouchableOpacity>
                                            <Text style = {styles.ReactsLeftLabel}>
                                                Love
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.reactionContainer}>
                                        <View style = {styles.reactionRightBox}>
                                            <TouchableOpacity onPress={() => handleCommentClick(item.post_ID)}>
                                                <Feather name="message-circle" size={24} color="#E60965" />
                                            </TouchableOpacity>
                                            <Text style={styles.ReactsLabel}>Comments</Text>
                                        </View> 
                                    </View>
                                </View>
                    </View>
                   
                    <ScrollView
                    style = {{ 
                        flex: 1,
                        marginBottom: 20,  
                    }}
                    >
                        {openComments[item.post_ID] && (
                        <>
                        <View style = {styles.commentOutputBox}>
                            {item.comments_ID && item.comments_ID.map((comment, index) => (
                                <View style ={{marginTop: 10}} key={index}>
                                     <View style={[styles.flex_start, {
                                        backgroundColor: "#f5f5f5"
                                        }]}>
                                        { (!comment.DonorOwnerID || !comment.DonorOwnerID.DPLink)
                                            && (!comment.RequestorOwnerID || !comment.RequestorOwnerID.DPLink)
                                            ?<FontAwesome name="user-circle-o" size={40} color="#E60965" />
                                            : comment.DonorOwnerID && comment.DonorOwnerID.DPLink 
                                            ?  <Image
                                                source = {{uri: comment.DonorOwnerID.DPLink}}
                                                style = {{
                                                    width: 45,
                                                    height: 45,
                                                    borderWidth: 1,
                                                    borderRadius: 100,
                                                    borderColor: "#E60965",
                                                }} 
                                            />
                                            : comment.RequestorOwnerID && comment.RequestorOwnerID.DPLink 
                                            && <Image
                                                    source = {{uri: comment.RequestorOwnerID.DPLink}}
                                                    style = {{
                                                        width: 45,
                                                        height: 45,
                                                        borderWidth: 1,
                                                        borderRadius: 100,
                                                        borderColor: "#E60965",
                                                    }} 
                                                />
                                        }
                                        <View>
                                            <Text style={styles.Name}>
                                                {
                                                    comment.DonorOwnerID && comment.DonorOwnerID.userName
                                                    ? comment.DonorOwnerID.userName 
                                                    : comment.RequestorOwnerID && comment.RequestorOwnerID.userName  
                                                }

                                            </Text>
                                            <View style={styles.flex_Row}>
                                                <MaterialIcons name="verified" size={14} color="#E60965" />
                                                <Text style={styles.UserType}>
                                                    {
                                                        comment.DonorOwnerID && comment.DonorOwnerID.userType
                                                        ? comment.DonorOwnerID.userType
                                                        : comment.RequestorOwnerID && comment.RequestorOwnerID.userType
                                                    }
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.commentInput}>{comment.content}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                ))}
                            
                            {comments
                                .filter(comment => comment.post_ID === item.post_ID) // Filter comments for the current post
                                .map((comment, index) => (
                                <View key={index}>
                                    <View style={[styles.flex_start, {backgroundColor: "#f5f5f5"}]}>
                                        {!userInformation.DPLink ? (
                                            <FontAwesome name="user-circle-o" size={40} color="#E60965" />
                                        ) : (
                                            <Image
                                                source={{ uri: userInformation.DPLink }}
                                                style={{
                                                    width: 45,
                                                    height: 45,
                                                    borderWidth: 1,
                                                    borderRadius: 100,
                                                    borderColor: "#E60965",
                                                }}
                                            />
                                        )}
                                        <View>
                                            <Text style={styles.Name}>{userInformation.userName}</Text>
                                            <View style={styles.flex_Row}>
                                                <MaterialIcons name="verified" size={14} color="#E60965" />
                                                <Text style={styles.UserType}>{userInformation.userType}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.commentInput}>{comment.content}</Text>
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
                                        onChangeText={(text) => handleCommentChange(text, item.post_ID)}
                                        value={commentTexts[item.post_ID] || ''} // Use the comment text for the current post ID

                                    />
                                
                                </View>
                                <TouchableOpacity disabled={comment === ""} onPress={() => handleAddComment( item.post_ID, comment)}>
                                    <Ionicons name="send" size={24} color="#E60965" />
                                </TouchableOpacity>
                            </View>
                        </>
                    )} 
                    </ScrollView>
                </>
              )}
              keyExtractor={item => item._id}
              ListFooterComponent={
                totalPosts === loadedPosts ? (
                    <View style={{ paddingVertical: "10%", alignItems: 'center', marginBottom: 10}}>
                        <Text>No more posts</Text>
                    </View>
                ) : null
            }
            />
             <Spinner
              visible={isLoading}
              textContent={'Loading...'}
              textStyle={{ color: '#FFF' }}
            />

            <Modal 
            transparent={true} 
            visible = {isModalOpen}  
            onRequestClose={() => {
                      setIsModalOpen(false);
                  }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        {/* Modal content */}
                        <View 
                        style = {{
                            flexDirection: "row", 
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginHorizontal: "5%",
                            marginBottom: "5%",
                            borderBottomWidth: 1,
                            borderBottomColor: "#FFACC7",
                            paddingHorizontal: 5,
                            paddingBottom: 10
                        }}>
                            <Text style = {{
                                color: "#E60965",
                                fontFamily: "Open-Sans-Bold",
                                fontSize: 17,
                            }}>Create Post</Text>
                            <TouchableOpacity disabled = {postContent === ""} onPress={() => handleAddPost()}>
                                <Text style = {{
                                    color: "#E60965",
                                    fontFamily: "Open-Sans-SemiBold",
                                    fontSize: 13,
                                    borderWidth: 1,
                                    borderColor: "#E60965",
                                    borderRadius: 7,
                                    backgroundColor: "#FFE5EC",
                                    paddingHorizontal: 13,
                                    paddingVertical: 5,
                                    textAlign: "center"
                                    
                                }}>Post</Text>
                            </TouchableOpacity>
                            
                        </View>
                        <View style={{ 
                            flexDirection: "row",
                            marginLeft: "5%"
                            }}>
                        { profilePic === "" 
                            ?<FontAwesome name="user-circle-o" size={40} color="#E60965" />
                            : <Image
                                source = {{uri: profilePic}}
                                style = {{
                                    width: 45,
                                    height: 45,
                                    borderWidth: 1,
                                    borderRadius: 100,
                                    borderColor: "#E60965",
                                }}
                            />
                        }
                            <View>
                                <Text style={styles.Name}>
                                    {userInformation.userName}
                                </Text>
                                <View style={styles.flex_Row}>
                                    <MaterialIcons name="verified" size={14} color="#E60965" />
                                    <Text style={styles.UserType}>
                                        {userInformation.userType}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <TextInput
                                style={styles.postInput}
                                multiline={true}
                                textAlignVertical="top"
                                onChangeText={setPostContent}
                                placeholder={`Got something to share ${firstName}?`}
                                value={postContent}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            
      </View >

      

    )
    
  }

  const styles = StyleSheet.create ({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
    },

    postInput: {
        // backgroundColor: "pink",
        // borderWidth: 1,
        // borderColor: "#E60965",
        padding: "3%",
        marginLeft: "3%",
        marginTop: "3%",
        marginBottom: "10%",
        height: 150
    },  
    container: {
        backgroundColor: 'red',
        marginVertical: "5%"
     },

     Row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
      marginBottom: 20,
    },
    modalBox: {
        marginHorizontal: "6%",
        borderWidth: 4,
        borderColor: "#E60965",
        borderRadius: 20,
        paddingTop: "5%",  
        paddingHorizontal: "2%",
        backgroundColor: "white",
        width: "80%",
        marginVertical: "10%",
    },

    Box: {
        flex: 1,
        backgroundColor: 'white',
        //width: '90%',
        marginHorizontal: "10%",
        // borderWidth: 4,
        // borderColor: "#E60965",
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
        // borderBottomWidth: 0,
        borderRadius: 17,
        paddingHorizontal: "7%",
        elevation:5,
        paddingTop: 17
    },

    reactionContainer: {
        flex: 1,
        elevation:5
    },

    reactionLeftBox: {
        flexDirection: "row",
        justifyContent: "center",
        // borderWidth:4,
        // borderRightWidth: 0,
        // borderColor: "#E60965",
        // borderBottomLeftRadius: 15,
        paddingVertical: 7,
        // elevation:5
    },

    reactionRightBox: {
        flexDirection: "row",
        justifyContent: "center",
        // borderWidth:4,
        // borderBottomRightRadius: 15,
        // borderColor: "#E60965",
        paddingVertical: 7,
        // elevation:5
    },

    commentContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor:  "#E60965",
        paddingLeft: 10,
        paddingVertical: 10,
        marginRight: -30,
    },

    commentInput: {
        color: "#E60965",
        fontSize: 15,
        fontFamily: "Open-Sans-Regular",
        marginLeft: 7,
    },
    commentOutputBox: {
        //backgroundColor: "gray",
        flex: 1,
        marginHorizontal: 30,
        paddingTop: 10,
    },


    flex_start: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
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
        fontSize: 17,
        marginHorizontal: "5%",
        marginLeft: 5
    },

    UserType: {
        marginHorizontal: "2%",
        color: "#E60965",
        fontFamily: "Open-Sans-Regular",
        fontSize: 13,
    },

    postContent: {
        fontFamily: 'Open-Sans-Regular',
        fontSize: 15,
        color: "#E60965",
        marginTop: 10,

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

  