import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Trial() {
    const[file,setFile] = useState([])
    useEffect(  ()=>{
         axios.get(`http://127.0.0.1:8080/api/v1/files/ess/get`)
        .then(function(response){
            console.log(response.data);
            setFile(response.data)
        })
        .catch(function(error){
            console.error(error);
        })
    })
  return (
    <View>
        {
            file.map((item,index)=>{
                return(
                    <Text key={index}>
                        {item.name}
                    </Text>
                )
            })
        }
      <Text>Trial</Text>
    </View>
  )
}