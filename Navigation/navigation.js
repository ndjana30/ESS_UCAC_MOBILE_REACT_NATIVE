import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import Courses from '../Screens/Courses';
import Course_Details from '../Screens/Course_Details';
import C_D from '../Screens/C_D';
import Lesson_Details from '../Screens/Lesson_Details';

const Stack = createNativeStackNavigator();
// screenOptions={{headerTitle:true}}
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
      {/* <Stack.Screen name='C_D' component={C_D} options = {{headerTitle:'C_D'}} /> */}
        <Stack.Screen name='Login' component={Login} options={{headerTitle:'ESS-UCAC LOGIN'}} />
        <Stack.Screen name='Signup' component={Signup} options={{headerTitle:'ESS-UCAC SIGNUP'}} />
        <Stack.Screen name='Courses' component={Courses} options={{headerTitle:'ESS-UCAC COURSES'}} />
        <Stack.Screen name='Course_Details' component={Course_Details} options = {{headerTitle:'COURSE DETAILS'}} />
        <Stack.Screen name='C_D' component={C_D} options = {{headerTitle:'COURSE DETAILS'}} />
        <Stack.Screen name='Lesson_Details' component={Lesson_Details} options = {{headerTitle:'LESSON DETAILS'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}