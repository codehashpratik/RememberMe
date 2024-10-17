import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../screens/auth/SignUp';
import SignIn from '../screens/auth/SignIn';
import Splash from '../screens/auth/Splash';
import Home from '../screens/main/Home';
import {useSelector} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import About from '../screens/main/About';
import ContactUs from '../screens/main/ContactUs';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthSection() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

function MainSection() {
  return (
    // <Stack.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //   }}>
    //   <Stack.Screen name="Home" component={Home} />
    // </Stack.Navigator>

    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About Us" component={About} />
      <Drawer.Screen name="Contact Us" component={ContactUs} />
    </Drawer.Navigator>
  );
}

const NavigationHandler = () => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  return (
    <NavigationContainer>
      {AuthReducer.isToken == null ? <AuthSection /> : <MainSection />}
    </NavigationContainer>
  );
};

export default NavigationHandler;
