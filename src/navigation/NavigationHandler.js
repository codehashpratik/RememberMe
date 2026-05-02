import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Colors } from '../themes/Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Splash from '../screens/auth/Splash';
import SignUp from '../screens/auth/SignUp';
import SignIn from '../screens/auth/SignIn';
import Home from '../screens/main/Home';
import TermsandConditions from '../screens/main/TermsandConditions';
import ContactUs from '../screens/main/ContactUs';
import CompleteProfile from '../screens/main/CompleteProfile';
import CustomDrawer from '../components/CustomDrawer';
import { signInSuccess } from '../redux/reducer/AuthReducer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// 🔹 1️⃣ Auth Section
function AuthSection() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

// 🔹 2️⃣ Drawer Section (main app)
function DrawerSection() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Terms & Conditions" component={TermsandConditions} />
      <Drawer.Screen name="Contact Us" component={ContactUs} />
    </Drawer.Navigator>
  );
}

// 🔹 3️⃣ Main Section (checks profile completion)
function MainSection() {
  const [isProfileComplete, setIsProfileComplete] = useState(null);

  const checkProfile = async () => {
    const uid = auth().currentUser?.uid;
    if (!uid) return;
    try {
      const doc = await firestore().collection('users').doc(uid).get();
      setIsProfileComplete(doc.exists);
    } catch (err) {
      console.error('Error checking user profile:', err);
      setIsProfileComplete(false);
    }
  };

  useEffect(() => {
    checkProfile();
  }, []);

  if (isProfileComplete === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.white,
        }}
      >
        <ActivityIndicator size="large" color={Colors.sea_Green} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isProfileComplete ? (
        <Stack.Screen name="DrawerSection" component={DrawerSection} />
      ) : (
        <Stack.Screen name="CompleteProfile">
          {props => (
            <CompleteProfile {...props} onProfileComplete={checkProfile} />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}

// 🔹 4️⃣ Final Navigation handler
const NavigationHandler = () => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('USER_TOKEN');

        if (token) {
          dispatch(signInSuccess(token));
        }
      } catch (e) {
        console.log('Error loading token', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.sea_Green} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {AuthReducer.isToken == null ? <AuthSection /> : <MainSection />}
    </NavigationContainer>
  );
};

export default NavigationHandler;
