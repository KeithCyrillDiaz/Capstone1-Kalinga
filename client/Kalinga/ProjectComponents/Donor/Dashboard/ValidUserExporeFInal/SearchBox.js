import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';


export const SearchBox = ({onSelect, data, onClear }) => {
 
    const [showList, setShowList] = useState(false)
    const [onSearch, setOnSearch] = useState(false)
    const [input, setInput] = useState("")
    const [id, setId] = useState(null)
    
    const handleSearchChange = (id, name) => {
        setInput(name)
        setId(id)
        setShowList(false)
    }

    return (
        <>
            <View style = {styles.searchBox}>
                <TextInput
                    multiline={true}
                    style = {styles.textInput}
                    placeholder='Search'
                    onFocus={() => setShowList(true)}
                    onChangeText={(text) => setInput(text)}
                    onTouchCancel={() => setShowList(false)}
                    value={input}
                />
                {!onSearch && (
                    <TouchableOpacity
                        disabled={input === ""}
                        onPress={() => {
                            onSelect(id)
                            setOnSearch(true)}}
                    >
                       <FontAwesome name="search" size={24} color="black" />
                    </TouchableOpacity>
                )}
                {onSearch && (
                    <TouchableOpacity
                        onPress={() => {
                            setOnSearch(false);
                            onSelect(null)
                            setInput("");
                            onClear()
                        }}
                    >
                      <AntDesign name="closecircle" size={24} color="black" />
                    </TouchableOpacity>
                )}
                
            </View>
           {showList && (
             <View style={[styles.listContainer, input !== "" ? {marginTop: 10} : {marginTop: 0} ]}>
                <FlatList 
                data={data}
                renderItem={({item}) => {
                if(item.name.toLowerCase().includes(input.toLowerCase())) {
                    return (
                        <TouchableOpacity
                        onPress={() => handleSearchChange(item.id, item.name)}
                        >
                            <Text>{item.name}</Text>
                            <View style ={{width: "100%", borderColor: "gray", borderBottomWidth:1,marginVertical: 5}}/>
                        </TouchableOpacity>
                    )
                }
                }}
                />
            </View>
           )}
        </>
             
    )
}

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: "row",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#E60965",
        width: "75%",
        marginLeft: "5%",
        position: "absolute",
        flex: 1,
        zIndex: 10,
        elevation: 5,
        top: 110,
        alignItems:"center",
        borderRadius: 17,
        paddingRight: 10,
        maxHeight: 70,
    },
    textInput: {
        width: "90%",
        height: "100%",
        fontFamily: "Open-Sans-Regular",
        paddingLeft: 17,
        fontSize: 15,
        marginVertical: 10,
    },
    listContainer: {
        flex: 1, 
        maxHeight: 250,
        paddingTop: 35,
        paddingBottom: 10,
        backgroundColor: "white", 
        position: "absolute", 
        zIndex:5,
        top: 130,
        width: "75%",
        left: 22,
        paddingHorizontal: 10,
        borderRadius: 17,
        elevation: 5
    },
})