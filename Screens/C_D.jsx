import { View, Text, ScrollView, StyleSheet,ActivityIndicator,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRoute } from '@react-navigation/native'
import course from '../Components/Images/course.png'

export default function C_D({ navigation}) {


    const route = useRoute()
    const course_id = route.params?.course_id
    const course_name = route.params?.course_name
    const [lecturers,setLecturers]= useState([])
    const [lessons,setLessons]= useState([])

    useEffect(()=>{
       const getLecturers= async() =>
        { await axios.get(`https://essucacmobile.onrender.com/api/v1/courses/${course_id}/lecturers/all`)
        .then(function(response)
      {
        // console.log(response.data);
        // console.log("course id is: "+ course_id);
        setLecturers(response.data)
      })
      .catch(function(error){
        console.info(error)
      })
    }
getLecturers();
    const getLessons=async()=>{   await axios.get(`https://essucacmobile.onrender.com/api/v1/courses/${course_id}/lessons/all`)
      .then(function(response)
    {
      // console.log(response.data);
      // console.log("course id is: "+ course_id);
      setLessons(response.data)
    })
    .catch(function(error){
      console.info(error)
    })
  }
getLessons();
    },[])    
  

  return (
    <View>
        <View style={styles.first}>
            <View style={styles.first_line_1}>
               <Text style={styles.text1}>
                {course_name}
               </Text>
            </View>
            <View style={styles.first_line_2}>
            {
          lecturers.length == 0 ? <Text>No Lecturer  Yet  {<ActivityIndicator size="small" color="#0000ff" />}</Text>  :
          lecturers.map((l,index)=>{
            return(
            <View key={index} >
               <Text>
                    Lecturer(s): 
                    {<Text style={styles.text2}>{lecturers.length}
                    </Text>}
                </Text>
                <Text style={styles.text3}>
                 {l.username}
               </Text>
            </View>
            )
          })
        }
               
               
               
            </View>
        </View>
        <ScrollView style={styles.second}>
            {
                lessons.length==0 ? <Text> {<ActivityIndicator size="small" color="#0000ff"/>} No Lessons Yet</Text>: 
                lessons.map((item,index)=>{
                    return(
                        // <View style={styles.second_1} key={index}>
                        //     <Text onPress={()=>{navigation.navigate('Lesson_Details',{lesson_id:item.id})}} style={styles.second_text}> {item.name}</Text>
                        // </View>






<View key={index} style={styles.shadowBox}>
         
{
<Image 
  source={course}
  style={styles.courseImage}
  // onLoadStart={() => console.log('Image loading started')}
  // onLoadEnd={() => console.log('Image loaded successfully')}
  // onError={(error) => console.error('Failed to load image:', error)}
  >

  </Image> 
}
 {/* onPress={ navigation.navigate('Course_Details',{course_id:item.id}) } */}
  <Text style={styles.second_text}
  onPress={ ()=>{navigation.navigate('Lesson_Details',{lesson_id:item.id})} }
 >
  {item.name}
  </Text>
  
</View>

                    






                    )
                })
            }
            
        </ScrollView>
    </View>
  )
}

const styles= StyleSheet.create({
    first:{
        backgroundColor:"#5FB18D",
        opacity:0.7,
        display:'flex',
        height:200,
        flexDirection:'column',

    },
    first_line_1:{
        display:'flex',
        margin:'auto',
        backgroundColor:'#fff',
        borderColor:"#fff",
        borderWidth:1,
        borderRadius:10,
        padding:10,
        width:'60%',
        marginTop:5
    },
    first_line_2:{
        display:'flex',
        flexDirection:'column',
        alignSelf:'flex-start',
        marginBottom:100,
        marginLeft:20
    },
    text1:{
        color:"#FD275E",
        margin:'auto'
    },
    text2:{
        color:"#fff",
        fontSize:25
    },
    text3:{
    color:"#fff",
    fontSize:20
    }
    ,
    second:{
        display:'flex',
        flexDirection:'column',
        backgroundColor:"#fff",
        height:350
    }
    , 
    second_1:{
        display:'flex',
        margin:'auto',
        borderWidth:1,
        borderColor:'#FD275E',
        padding:20,
        width:"100%",
        borderRadius:20,
        backgroundColor:"beige",
        marginTop:10,
        marginBottom:10
    },
    second_text:{
        margin:"auto"
    },
    courseImage:{
      width: "100%", 
      height: 200,
    },shadowBox: {
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
})