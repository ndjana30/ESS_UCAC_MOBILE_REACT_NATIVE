import { View, Text, StyleSheet, FlatList, ScrollView,Image,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import gym from '../Components/Images/gym.jpg'

export default function Courses({ navigation }) 
{

    const[courseList,setCourseList]= useState([])
   
    useEffect(()=>
        {
        axios.get(`https://essucacmobile.onrender.com/api/v1/courses/all`)
        .then(function(response)
        {
            // console.log(response.data);
            setCourseList(response.data)
        })
        .catch(function(error)
        {
            console.info(error)
        })
            
    })

    
    
  return (
    <View>
      {
        courseList.length==0? <ActivityIndicator size="small" color="#0000ff" /> :
      <ScrollView showsVerticalScrollIndicator>
      {
        
         courseList.map((item,index) => (
        
        <View key={index} style={styles.shadowBox}>
         
          {
          /* <Image 
            source={gym}
            style={{width: 100, height: 100}}
            // onLoadStart={() => console.log('Image loading started')}
            // onLoadEnd={() => console.log('Image loaded successfully')}
            // onError={(error) => console.error('Failed to load image:', error)}
            >
          
            </Image> */
          }
           {/* onPress={ navigation.navigate('Course_Details',{course_id:item.id}) } */}
            <Text style={styles.courseText}
            onPress={ ()=>{navigation.navigate('C_D',{course_id:item.id,course_name:item.name})} }
           >
            {item.name}
            </Text>
            
        </View>
     
        
          )) 
      }
      </ScrollView>
    }
    </View>
  )
}
const styles = StyleSheet.create({
    courseText:{
        fontSize:20,
        fontWeight:'bold',
        color:"#FFFFFF"
    },
    shadowBox: {
      display:'flex',
      flexDirection:'column',
      shadowColor: "rgba(0, 0, 0, 0.75)",
      shadowOffset: { width: 0, height: 2 }, // Set the offset of the shadow
      shadowRadius: 3.84, // Set the blur radius of the shadow
      marginTop:20,
      marginBottom:20,
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderRadius:10,
      padding:5,
      height:100,
      width:"100%",
      alignSelf:'center',
      backgroundColor:"#5FB18D"
    }
})