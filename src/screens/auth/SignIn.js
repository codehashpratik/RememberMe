// import {
//   View,
//   Text,
//   StatusBar,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import React, { useRef, useState } from 'react';
// import { Colors, Fonts, Icons } from '../../themes/Themes';
// import normalize from '../../utils/normalize';
// import TextInput1 from '../../components/TextInput1';
// import showMessage from '../../utils/showMessage';
// import auth from '@react-native-firebase/auth';
// import { signInSuccess } from '../../redux/reducer/AuthReducer';
// import { useDispatch } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SignIn = props => {
//   const [email, setEmail] = useState('');
//   const [pass, setPass] = useState('');
//   const passRef = useRef();
//   const dispatch = useDispatch();

//   function validation() {
//     if (email == '') {
//       showMessage('Please enter email');
//     } else if (pass == '') {
//       showMessage('Please enter password');
//     } else {
//       // auth()
//       //   .signInWithEmailAndPassword(email, pass)
//       //   .then(() => {
//       //     showMessage('Login Successfull!');
//       //     let token = auth().currentUser.uid;
//       //     dispatch(signInSuccess(token));

//       //     console.log(token);
//       //   })

//       auth()
//         .signInWithEmailAndPassword(email, pass)
//         .then(async () => {
//           showMessage('Login Successfull!');

//           let token = auth().currentUser.uid;

//           // ✅ Save token in AsyncStorage
//           await AsyncStorage.setItem('USER_TOKEN', token);

//           dispatch(signInSuccess(token));

//           console.log('Stored Token:', token);
//         })

//         .catch(error => {
//           if (error.code === 'auth/email-already-in-use') {
//             console.log('That email address is already in use!');
//           }

//           if (error.code === 'auth/invalid-email') {
//             console.log('That email address is invalid!');
//           }

//           console.error(error);
//         });
//     }
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//       }}
//     >
//       <ScrollView
//         style={{
//           flex: 1,
//           backgroundColor: Colors.grey_white,
//         }}
//       >
//         <StatusBar
//           translucent={true}
//           backgroundColor="transparent"
//           barStyle={'dark-content'}
//           showHideTransition={'slide'}
//         />
//         <Image
//           source={Icons.splashCorner}
//           style={{
//             height: normalize(150),
//             width: normalize(150),
//             resizeMode: 'contain',
//           }}
//         />
//         <Text
//           style={{
//             fontSize: normalize(13),
//             color: Colors.black,
//             fontFamily: Fonts.Mochiy_Regular,
//             textAlign: 'center',
//             marginTop: normalize(20),
//           }}
//         >
//           Welcome back!
//         </Text>
//         <Image
//           source={Icons.welcomeBack}
//           style={{
//             height: normalize(150),
//             width: normalize(150),
//             resizeMode: 'contain',
//             alignSelf: 'center',
//             marginVertical: normalize(20),
//           }}
//         />

//         <TextInput1
//           placeholder={'Enter your email'}
//           value={email}
//           onChangeText={e => {
//             setEmail(e);
//           }}
//           onSubmitEditing={() => {
//             passRef.current.focus();
//           }}
//         />
//         <TextInput1
//           secureTextEntry={true}
//           placeholder={'Enter password'}
//           value={pass}
//           refer={passRef}
//           onChangeText={e => {
//             setPass(e);
//           }}
//         />

//         <TouchableOpacity
//           style={{
//             alignSelf: 'center',
//             marginVertical: normalize(30),
//           }}
//         >
//           <Text
//             style={{
//               fontFamily: Fonts.Mochiy_Regular,
//               fontSize: normalize(10),
//               color: Colors.sea_Green,
//               marginLeft: normalize(4),
//             }}
//           >
//             Forget Password ?
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => {
//             validation();
//           }}
//           style={{
//             height: normalize(43),
//             width: '80%',
//             backgroundColor: Colors.sea_Green,
//             alignSelf: 'center',
//             marginTop: normalize(10),
//             borderRadius: normalize(9),
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Text
//             style={{
//               fontFamily: Fonts.Poppins_SemiBold,
//               fontSize: normalize(12),
//               color: Colors.white,
//             }}
//           >
//             Login
//           </Text>
//         </TouchableOpacity>
//         <View
//           style={{
//             flexDirection: 'row',
//             height: normalize(30),
//             width: '70%',

//             alignSelf: 'center',
//             marginTop: normalize(17),
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <Text
//             style={{
//               fontFamily: Fonts.Mochiy_Regular,
//               fontSize: normalize(10),
//             }}
//           >
//             Dont have an account ?
//           </Text>
//           <TouchableOpacity
//             onPress={() => {
//               props.navigation.navigate('SignUp');
//             }}
//           >
//             <Text
//               style={{
//                 fontFamily: Fonts.Mochiy_Regular,
//                 fontSize: normalize(10),
//                 color: Colors.sea_Green,
//                 marginLeft: normalize(4),
//               }}
//             >
//               Sign Up
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default SignIn;

import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Colors, Fonts, Icons } from '../../themes/Themes';
import normalize from '../../utils/normalize';
import TextInput1 from '../../components/TextInput1';
import showMessage from '../../utils/showMessage';
import auth from '@react-native-firebase/auth';
import { signInSuccess } from '../../redux/reducer/AuthReducer';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const passRef = useRef();
  const dispatch = useDispatch();

  function validation() {
    if (email == '') {
      showMessage('Please enter email');
    } else if (pass == '') {
      showMessage('Please enter password');
    } else {
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(async () => {
          showMessage('Login Successful!');

          let token = auth().currentUser.uid;
          await AsyncStorage.setItem('USER_TOKEN', token);

          dispatch(signInSuccess(token));
        })
        .catch(error => {
          console.error(error);
          showMessage('Invalid credentials');
        });
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        {/* Top Decoration */}
        <Image source={Icons.splashCorner} style={styles.cornerImage} />

        {/* Title */}
        <Text style={styles.title}>Welcome back!</Text>

        {/* Illustration */}
        <Image source={Icons.welcomeBack} style={styles.centerImage} />

        {/* Inputs */}
        <View style={styles.inputContainer}>
          <TextInput1
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => passRef.current.focus()}
          />

          <TextInput1
            secureTextEntry
            placeholder="Enter password"
            value={pass}
            refer={passRef}
            onChangeText={setPass}
          />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={validation}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={styles.signup}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.grey_white,
  },
  container: {
    flexGrow: 1,
    paddingBottom: normalize(30),
  },
  cornerImage: {
    height: normalize(140),
    width: normalize(140),
    resizeMode: 'contain',
  },
  title: {
    fontSize: normalize(16),
    fontFamily: Fonts.Mochiy_Regular,
    color: Colors.black,
    textAlign: 'center',
    marginTop: normalize(10),
  },
  centerImage: {
    height: normalize(140),
    width: normalize(140),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: normalize(20),
  },
  inputContainer: {
    width: '85%',
    alignSelf: 'center',
    gap: normalize(12),
  },
  forgot: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginTop: normalize(10),
  },
  forgotText: {
    fontFamily: Fonts.Mochiy_Regular,
    fontSize: normalize(10),
    color: Colors.sea_Green,
  },
  button: {
    height: normalize(45),
    width: '85%',
    backgroundColor: Colors.sea_Green,
    alignSelf: 'center',
    marginTop: normalize(20),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(12),
    color: Colors.white,
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: normalize(20),
  },
  footerText: {
    fontFamily: Fonts.Mochiy_Regular,
    fontSize: normalize(10),
  },
  signup: {
    fontFamily: Fonts.Mochiy_Regular,
    fontSize: normalize(10),
    color: Colors.sea_Green,
  },
});
