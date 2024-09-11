import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home/index';         // Adjust path for home
import PoliticiansScreen from './politicians/index';  // Adjust path for politicians
import PortfolioScreen from './portfolio/index';      // Adjust path for portfolio

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        animationEnabled: false,  // Disable all animations
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true , title:'none'}} />
        <Stack.Screen name="Politicians" component={PoliticiansScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Portfolio" component={PortfolioScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}
