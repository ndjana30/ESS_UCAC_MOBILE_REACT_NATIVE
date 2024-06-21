import { View, Text, StyleSheet, FlatList, ScrollView,Image,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRoute } from '@react-navigation/native'

export default function Course_Details() 
{

  const route = useRoute()
  const course_id = route.params?.course_id
  const [lecturers,setLecturers]= useState([])
  const [students,setStudents] = useState([])

  useEffect(()=>{
    axios.get(`https://essucacmobile.onrender.com/api/v1/courses/${course_id}/lecturers/all`)
    .then(function(response)
  {
    console.log(response.data);
    console.log("course id is: "+ course_id);
    setLecturers(response.data)
  })
  .catch(function(error){
    console.info(error)
  })

  axios.get(`https://essucacmobile.onrender.com/api/v1/courses/${course_id}/students/all`)
  .then(function(response)
  {
    console.log(response.data);
    
    setStudents(response.data)
  })
  .catch(function(error){
    console.info(error)
  })

  })
  return (
    <View>
      
        
      <ScrollView style={styles.block}>
        {
          lecturers.length == 0 ? <Text>No Lecturer  Yet  {<ActivityIndicator size="small" color="#0000ff" />}</Text>  :
          lecturers.map((l,index)=>{
            return(
            <View key={index} style={styles.lecturers}>
              <Text style={styles.text}> Lecturer: {l.username}</Text>
            </View>
            )
          })
        }
        </ScrollView>

        <ScrollView style={styles.block}>
        {
          students.length==0? <Text>No students yet  {<ActivityIndicator size="small" color="#0000ff" />}</Text> :
          students.map((student,index)=>{
            return(
            <View key={index} style={styles.lecturers}>
              <Text style={styles.text}> Student: {student.username}</Text>
            </View>
            )
          })
        }
      </ScrollView>

      
      
      
    </View>
  )
}

const styles = StyleSheet.create({
   text:{
    color:'black'
  },
  lecturers:{
    borderWidth:1
  },
  block:{
    margin:10,
    padding:10
  }
})