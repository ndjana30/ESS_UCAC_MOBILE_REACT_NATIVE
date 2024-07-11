import { View, Text,ActivityIndicator,ScrollView,StyleSheet,Image } from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import course from '../Components/Images/course.png'
import { FloatingAction } from 'react-native-floating-action'

export default function Lecturer_Courses({ navigation }) {

  const[courses,setCourses] = useState([]);
  useEffect(()=>{
    console.log("IN LECTURER COURSES");
    const fetchTokenAndCourses = async()=>{
      const tt =await AsyncStorage.getItem('token')

      const config = {
        headers: {
            Authorization: "Bearer "+`${JSON.parse(tt)}`
        }
    };
    
    axios.get('https://essucacmobile.onrender.com/api/v1/courses/courses/lecturer/all',
        config
      )
        .then(function(response){
          console.log(response.data);
          setCourses(response.data)
        })
        .catch(function(error){
          console.info(error);
        })


    }
    fetchTokenAndCourses();
    
  },[])
  return (
    <>
    <View>
     
        
      {
        courses.length==0? <ActivityIndicator size="small" color="#0000ff" /> :
      <ScrollView showsVerticalScrollIndicator>
      {
        
         courses.map((item,index) => (
        
        <View key={index} style={styles.shadowBox}>
          
          <Image 
            source={course}
            style={styles.courseImage}
            // onLoadStart={() => console.log('Image loading started')}
            // onLoadEnd={() => console.log('Image loaded successfully')}
            // onError={(error) => console.error('Failed to load image:', error)}
            >
            </Image> 
            <Text style={styles.courseText}
            onPress={ ()=>{navigation.navigate('Lecturer_Courses_Details',{course_id:item.id,course_name:item.name})} }
           >
            {item.name}
            </Text>
        </View>
          )) 
      }
      </ScrollView>
    }
    
    </View>
    <FloatingAction
    onOpen={()=>{console.log("You pressed me");}}
    onClose={()=>{console.log("You closed me");}}
          // onPress={()=>{navigation.navigate('Login')}}
          color="#FD275E"
          name="plus"
          // text="Add"
          // iconText="Add"
          iconColor="green"
          // textStyle={{ color: "orange" }}
          position="right"
        />
    </>
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
    height:250,
    width:"90%",
    alignSelf:'center',
    backgroundColor:"#5FB18D"
  },
  courseImage:{
    width: "100%", 
    height: 200,
  }
})