import React ,{useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation })
{
  useEffect(() => {
    console.log("IN LOGIN SCREEN");

    //  const token =  AsyncStorage.getItem('token');
    //     if (token) {
    //       console.log('token is '+ token);
    //   axios.get('https://essucacmobile.onrender.com/api/v1/auth/user/get',
    //      { 
    //       headers:
    //        {
    //         'Authorization': token
    //       }
    // })
    // .then(function(response){
    //   console.log("response data is: "+response.data);
    //   response.data == 'LECTURER'? navigation.navigate('Lecturer_Courses') : navigation.navigate('Courses');
    // })
    // .catch(function(error)
    // {
    //   console.info(error)
    // })
    //     } else {
    //       console.log('No token found in storage.');
    //     }
  },[]);
  
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loginError,setLoginError] = useState("");

  function getCredentials()
  {
    // const retrieveToken = async () => {
    //     // I GET THE TOKEN HERE TO VERIFY THE LEVEL OF AUTHORITY OF THE USER THAT LOGS IN
    //   try {
    // //     const token = await AsyncStorage.getItem('token');
    // //     if (token) {
    // //       console.log('token is '+ token);
    // //   axios.get('https://essucacmobile.onrender.com/api/v1/auth/user/get',
    // //      { 
    // //       headers:
    // //        {
    // //         'Authorization': token
    // //       }
    // // })
    // // .then(function(response){
    // //   console.log("response data is: "+response.data);
    // //   response.data == 'LECTURER'? navigation.navigate('Lecturer_Courses') : navigation.navigate('Courses');
    // // })
    // // .catch(function(error)
    // // {
    // //   console.info(error)
    // // })
    // //     } else {
    // //       console.log('No token found in storage.');
    // //     }
    //   } catch (error) 
    //   {
    //     console.error('Error retrieving token from storage:', error);
    //   }
    // };

    

    console.log("username is:\t"+username);
    console.log("password is:\t"+password);
    axios.post('https://essucacmobile.onrender.com/api/v1/auth/user/login',{
      username:username,
      password:password
    })
    .then(function(response){
      // console.log(response.data.tokenType + response.data.accessToken);
      const tk = response.data.accessToken
      try {
        AsyncStorage.setItem('token', JSON.stringify(tk));
        console.log("successfuly set the token in storage");

         const getToken = async ()=>{
          const tt = await AsyncStorage.getItem('token');
          console.log("token got is: "+ tt);
          console.log("token sent is: "+"Bearer "+`${JSON.parse(tt)}`)
          const config = {
    headers: {
        Authorization: "Bearer "+`${JSON.parse(tt)}`
    }
};
          axios.get('https://essucacmobile.onrender.com/api/v1/auth/user/get',config)
          .then(function(response){
            response.data == 'LECTURER'? navigation.navigate('Lecturer_Courses') : navigation.navigate('Courses');
          })
          .catch(function(error){
            console.info(error);
          })
         } 
         getToken();
       
        // navigation.navigate('Courses');
      } catch (error) {
        console.log("Could not set the token in storage");
      }


      // I GET THE TOKEN HERE TO VERIFY THE LEVEL OF AUTHORITY OF THE USER THAT LOGS IN
      // retrieveToken();
     
      
    })
    .catch(function(error)
    {
      console.error(error);
      setLoginError(error)
      
      // console.log('error');
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.LoginBox}>
        <Text style={styles.ess}>
          ESS-UCAC
        </Text>
        <Text style={styles.wrong}>
          {loginError? "Wrong Credentials":""}
        </Text>
        <TextInput
            style={styles.input}
            placeholder="EMAIL OR USERNAME"
            value={username}
            onChangeText={setUsername}
            autoCorrect={false}
            autoCapitalize="none"
            
          />
           <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Button title='Login'
          color='#5FB18D'
          onPress={getCredentials}
          
          >
          </Button>
          <Text>__________________ or _________________</Text>
          <Button title='Create New Account'
          color='#2B7B7F'
          onPress={()=>{navigation.navigate('Signup')}}
          
          >
          </Button>
      </View>
    </SafeAreaView>
         
  );
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