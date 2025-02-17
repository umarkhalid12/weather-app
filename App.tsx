import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './src/Screens/Home'
import Favourite from './src/Screens/Favourite'
import Search from './src/Screens/Search'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTabBar from './src/Screens/CustomTabBar';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Favourites from './src/Screens/Favourite'

const App = () => {
  const Bottom = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Bottom.Navigator tabBar={props => <CustomTabBar {...props}/>} screenOptions={{ headerShown: false }}>
        <Bottom.Screen 
          name="Home"
          component={Home} 
          options={{
            tabBarActiveTintColor: '#40739e',
            tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />

<Bottom.Screen 
          name="Search" 
          component={Search} 
          options={{
            tabBarActiveTintColor: '#40739e',
            tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="history" color={color} size={size} /> 
            ),
          }}
        />
        <Bottom.Screen 
          name="Favourite" 
          component={Favourites} 
          options={{
            tabBarActiveTintColor: '#40739e',
            tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="star" color={color} size={size} /> 
            ),
          }}
        />
        
      </Bottom.Navigator>
    </NavigationContainer>
  );
}

export default App;
