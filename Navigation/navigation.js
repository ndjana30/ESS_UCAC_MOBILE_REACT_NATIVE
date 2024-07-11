import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import Courses from '../Screens/Courses';
import Course_Details from '../Screens/Course_Details';
import C_D from '../Screens/C_D';
import Lesson_Details from '../Screens/Lesson_Details';
import Lecturer_Courses from '../Screens/Lecturer_Courses';
import Lecturer_Courses_Details from '../Screens/Lecturer_Courses_Details';
import LessonCreate from '../Screens/LessonCreate';
import Trial from '../Screens/Trial';

const Stack = createNativeStackNavigator();
// screenOptions={{headerTitle:true}}
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
      {/* <Stack.Screen name='C_D' component={C_D} options = {{headerTitle:'C_D'}} /> */}
      {/* <Stack.Screen name='trial' component={Trial}  /> */}
        <Stack.Screen name='Login' component={Login}  />
        {/* <Stack.Screen name='LessonCreate' component={LessonCreate} /> */}
        <Stack.Screen name='Signup' component={Signup}  />
        <Stack.Screen name='Courses' component={Courses} />
        <Stack.Screen name='Course_Details' component={Course_Details}  />
        <Stack.Screen name='C_D' component={C_D}/>
        <Stack.Screen name='Lesson_Details' component={Lesson_Details} />
        <Stack.Screen name='Lecturer_Courses' component={Lecturer_Courses} />
        <Stack.Screen name='Lecturer_Courses_Details' component={Lecturer_Courses_Details} />
        <Stack.Screen name='LessonCreate' component={LessonCreate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}