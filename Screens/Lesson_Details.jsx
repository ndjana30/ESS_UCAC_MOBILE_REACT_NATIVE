import { View, Text, ScrollView,ActivityIndicator,Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob';
import { check, request, RESULTS } from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';
import { FloatingAction } from 'react-native-floating-action'


export default function Lesson_Details() {

  const route = useRoute()
  const lesson_id = route.params?.lesson_id
  const[files,setFiles] = useState([])
  const [hasPermissions, setHasPermissions] = useState(null);
  useEffect(()=>{
    console.log("IN LESSON DETAILS");
    const getFiles = async()=>{ await axios.get(`https://essucacmobile.onrender.com/api/v1/lessons/${lesson_id}/files`)
    .then(function(response)
    {
      // console.log(response.data);
      setFiles(response.data)
    })
    .catch(function(error)
    {
      console.info(error)
    })
  }
    checkPermissions();
    getFiles();
  },[])

  const checkPermissions = async () => {
    const result = await check('WRITE_EXTERNAL_STORAGE');
    setHasPermissions(result === RESULTS.GRANTED);
  };

  const downloadImage = async (filename,fetchedImage,fetchedImageExtension) => {
    // Replace '<base64_image>' with your actual Base64 encoded image data
    const base64Image = fetchedImage;
    const { config, fs } = RNFetchBlob;
    const path = fs.dirs.DownloadDir + `/${filename}`; // Adjust the filename as needed
    // +'.'+`${fetchedImageExtension}`
    // const path = fs.dirs.DownloadDir + '/my_file.png'; // Adjust the filename as needed
    console.log('path is: '+path);

    fs.writeFile(path, base64Image, 'base64')
     .then((res) => {
        console.log('Image saved to ', path);
        Alert.alert('DOWNLOAD','FILE DOWNLOADED'+'\n'+'LE FICHIER EST DANS VOS DOCUMENTS',)
      })
     .catch((error) => {
        console.error(error);
      });
  };

  async function requestStoragePermissions( filename,fetchedImage) {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
  
      if (granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Storage permissions granted");
        downloadImage(filename,fetchedImage)
        
        // Proceed with your operation that requires storage permissions
      } 
     
      else {
        console.log("Storage permissions denied");
        Alert.alert('Storage permissions denied')
        // Handle the case where permissions are not granted
      }
    } catch (err) {
      console.warn(err);
    }
  }

  // async function requestStoragePermissions(filename,fetchedImage) {
  //   try {
  //     const granted = await PermissionsAndroid.requestMultiple(
  //       [PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES],
  //       {
  //         title: "App Storage Permission",
  //         message: "This app needs access to your photos.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can access the camera roll");
  //       downloadImage(filename,fetchedImage)
  //     } else {
  //       console.log("Camera roll permission denied");
  //       Alert.alert('Storage permissions denied')
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }
  


  return(
    <>
    <View>
        <ScrollView>
          {
            files.length == 0 ? <Text>No Files  Yet  {<ActivityIndicator size="small" color="#0000ff" />}</Text> :
            files.map((item,index)=>{
              return(
                <View key={index}>
                  <Text> FileName: {item.fileName}</Text>
                  <Text> FileExtension: {item.fileExtension}</Text>
                  <Button title='Download'
                    color='#2B7B7F'
                    onPress={()=>{
                      requestStoragePermissions(item.fileName,item.file)}}
                    >
                </Button>
                </View>
              )
            })
          }
        </ScrollView>
        
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