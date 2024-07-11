import { View, Text,Button,StyleSheet,TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import DocumentPicker from 'react-native-document-picker';
import { useRoute } from '@react-navigation/native';

export default function LessonCreate() {

    const route=useRoute()
    const course_id = route.params?.course_id;
    useEffect(()=>{
        console.log("course id is: "+course_id);
    },[])
    const [fileName,setFileName] = useState('')
    const pickDocument = async () => {
        try {
          const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
          });
        //   setFileName(result)
        result.map((item,index)=>{
            console.log(item.name);
            setFileName(item.name)
        })
        //   console.log(
        //     'URI: ' + result.uri,
        //     'Type: ' + result.type, // mime type
        //     'File Name: ' + result.name,
        //     'File Size: ' + result.size
        //   );
    
          // Do something with the file
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker
            console.log("User cancelled the picker");
          } else {
            throw err;
          }
        }
      };
    
  return (

    
    <View>
      <View style={styles.LoginBox}>
        <Text style={styles.ess}>
          Create a Lesson
        </Text>
        
        <TextInput
            style={styles.input}
            placeholder="ENTER THE COURSE NAME"
            value={{}}
            onChangeText={{}}
            autoCorrect={false}
            autoCapitalize
          />
          
          <Button title='Select Doc'
          color='#5FB18D'
          onPress={pickDocument}
          >
          </Button>
          <Text>{fileName? `file: `+fileName:'NO FILE SELECTED YET'}</Text>
          
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
 
    LoginBox:{
      
      backgroundColor:"ffffff",
      shadowRadius:"0px 0px 5px 0px",
      display:"flex",
      flexDirection:"column",
      justifyContent:'center',
      textAlign:"center",
      alignItems:"center",
      margin:"auto",
      gap:15,
      width:'90%',
      height:"100%",
      marginTop:'10%'
      
    },
     input:{
      borderRadius:1,
      backgroundColor:"#F8F0F0",
      shadowColor:"rgba(0, 0, 0, 0.75)",
      width:'100%',
      color:"#000"
    }
    ,
    container:{
      backgroundColor:"#FFFFFF",
      height:"100%"
    }, ess:{
      fontSize:20,
      fontWeight:'bold',
      color:"#FD275E"
    },
    wrong:{
      fontSize:10,
      fontWeight:'bold',
      color:"#FD275E"
    }
    
  
  })