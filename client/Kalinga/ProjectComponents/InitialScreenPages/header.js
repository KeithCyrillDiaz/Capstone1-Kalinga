import  React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
   return (
      <View style={styles.header}>
         <Text style={styles.headerTitle}>Menu</Text>
      </View>
    )
}

const styles = StyleSheet.create ({
   header: {
      height: 120,
      backgroundColor: '#E60965',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      elevation: 30,
      justifyContent: 'center',
      alignContent: 'center'

   },
   headerTitle: {
      marginTop: 50,
      fontFamily: 'Kurale-Regular',
      fontSize:20,
      color: 'white',
      textAlign: 'center'

   }
})