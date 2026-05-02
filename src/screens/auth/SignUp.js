// // import {
// //   View,
// //   Text,
// //   StatusBar,
// //   Image,
// //   TouchableOpacity,
// //   ScrollView,
// // } from 'react-native';
// // import React, {useRef, useState} from 'react';
// // import {Colors, Fonts, Icons} from '../../themes/Themes';
// // import normalize from '../../utils/normalize';
// // import TextInput1 from '../../components/TextInput1';
// // import showMessage from '../../utils/showMessage';
// // import auth from '@react-native-firebase/auth';
// // import connectionrequest from '../../utils/NetInfo';

// // const SignUp = props => {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [pass, setPass] = useState('');
// //   const [confirmPass, setConfirmPass] = useState('');
// //   const emailRef = useRef();
// //   const passRef = useRef();
// //   const confirmPassRef = useRef();

// //   function validateEmail(email) {
// //     var re = /\S+@\S+\.\S+/;
// //     return re.test(email);
// //   }

// //   function validatePassword(pass) {
// //     var vp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// //     return vp.test(pass);
// //   }

// //   function validation() {
// //     if (name == '') {
// //       showMessage('Please enter your full name');
// //     } else if (email == '') {
// //       showMessage('Please enter your email address');
// //     } else if (!validateEmail(email)) {
// //       showMessage('Please enter a valid email address');
// //     } else if (pass == '') {
// //       showMessage('Please enter password');
// //     } else if (!validatePassword(pass)) {
// //       showMessage(
// //         'Password must contain Minimum eight characters, at least one letter and one number',
// //       );
// //     } else {

// //       auth()
// //         .createUserWithEmailAndPassword(email, pass)
// //         .then(() => {
// //           showMessage('User account created Successfully!');
// //           props.navigation.navigate('SignIn');
// //         })
// //         .catch(error => {
// //           if (error.code === 'auth/email-already-in-use') {
// //             console.log('That email address is already in use!');
// //           }

// //           if (error.code === 'auth/invalid-email') {
// //             console.log('That email address is invalid!');
// //           }

// //           console.error(error);
// //         });
// //     }
// //   }

// //   return (
// //     <View
// //       style={{
// //         flex: 1,

// //       }}>
// //       <ScrollView
// //         style={{
// //           flex: 1,
// //           backgroundColor: Colors.grey_white,
// //         }}>
// //         {/* <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} /> */}
// //         <StatusBar
// //           translucent={true}
// //           backgroundColor="transparent"
// //           barStyle={'dark-content'}
// //           showHideTransition={'slide'}
// //         />
// //         <Image
// //           source={Icons.splashCorner}
// //           style={{
// //             height: normalize(150),
// //             width: normalize(150),
// //             resizeMode: 'contain',
// //           }}
// //         />
// //         <Text
// //           style={{
// //             fontSize: normalize(13),
// //             color: Colors.black,
// //             fontFamily: Fonts.Mochiy_Regular,
// //             textAlign: 'center',
// //             marginTop: normalize(20),
// //           }}>
// //           Welcome to Onboard!
// //         </Text>
// //         <View
// //           style={{
// //             height: normalize(35),
// //             width: '40%',
// //             alignSelf: 'center',
// //             // backgroundColor: Colors.half_baked,
// //             marginTop: normalize(15),
// //             marginBottom: normalize(55),
// //           }}>
// //           <Text
// //             style={{
// //               textAlign: 'center',
// //               fontFamily: Fonts.Mochiy_Regular,
// //               fontSize: normalize(9),
// //               //   color: Colors.black,
// //             }}>
// //             Let's help to meet your tasks
// //           </Text>
// //         </View>
// //         <TextInput1
// //           placeholder={'Enter your full name'}
// //           value={name}
// //           onChangeText={e => {
// //             setName(e);
// //           }}
// //           onSubmitEditing={() => {
// //             emailRef.current.focus();
// //           }}
// //         />
// //         <TextInput1
// //           placeholder={'Enter your email'}
// //           value={email}
// //           refer={emailRef}
// //           onChangeText={e => {
// //             setEmail(e);
// //           }}
// //           onSubmitEditing={() => {
// //             passRef.current.focus();
// //           }}
// //         />
// //         <TextInput1
// //           secureTextEntry={true}
// //           placeholder={'Enter password'}
// //           value={pass}
// //           refer={passRef}
// //           onChangeText={e => {
// //             setPass(e);
// //           }}
// //           onSubmitEditing={() => {
// //             confirmPassRef.current.focus();
// //           }}
// //         />
// //         <TextInput1
// //           secureTextEntry={true}
// //           placeholder={'Confirm password'}
// //           value={confirmPass}
// //           refer={confirmPassRef}
// //           onChangeText={e => {
// //             setConfirmPass(e);
// //           }}
// //         />

// //         <TouchableOpacity
// //           onPress={() => {
// //             validation();
// //           }}
// //           style={{
// //             height: normalize(43),
// //             width: '80%',
// //             backgroundColor: Colors.sea_Green,
// //             alignSelf: 'center',
// //             marginTop: normalize(40),
// //             borderRadius: normalize(9),
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //           }}>
// //           <Text
// //             style={{
// //               fontFamily: Fonts.Poppins_SemiBold,
// //               fontSize: normalize(12),
// //               color: Colors.white,
// //             }}>
// //             Register
// //           </Text>
// //         </TouchableOpacity>
// //         <View
// //           style={{
// //             flexDirection: 'row',
// //             height: normalize(30),
// //             width: '70%',

// //             alignSelf: 'center',
// //             marginTop: normalize(17),
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //           }}>
// //           <Text
// //             style={{
// //               fontFamily: Fonts.Mochiy_Regular,
// //               fontSize: normalize(10),
// //             }}>
// //             Already have an account ?
// //           </Text>
// //           <TouchableOpacity
// //             onPress={() => {
// //               props.navigation.navigate('SignIn');
// //             }}>
// //             <Text
// //               style={{
// //                 fontFamily: Fonts.Mochiy_Regular,
// //                 fontSize: normalize(10),
// //                 color: Colors.sea_Green,
// //                 marginLeft: normalize(4),
// //               }}>
// //               Sign In
// //             </Text>
// //           </TouchableOpacity>
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default SignUp;

// import {
//   View,
//   Text,
//   StatusBar,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
// } from 'react-native';
// import React, { useRef, useState } from 'react';
// import { Colors, Fonts, Icons } from '../../themes/Themes';
// import normalize from '../../utils/normalize';
// import TextInput1 from '../../components/TextInput1';
// import showMessage from '../../utils/showMessage';
// import auth from '@react-native-firebase/auth';

// const SignUp = props => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [pass, setPass] = useState('');
//   const [confirmPass, setConfirmPass] = useState('');

//   const emailRef = useRef();
//   const passRef = useRef();
//   const confirmPassRef = useRef();

//   function validateEmail(email) {
//     return /\S+@\S+\.\S+/.test(email);
//   }

//   function validatePassword(pass) {
//     return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);
//   }

//   function validation() {
//     if (!name) return showMessage('Please enter your full name');
//     if (!email) return showMessage('Please enter your email');
//     if (!validateEmail(email)) return showMessage('Invalid email');
//     if (!pass) return showMessage('Enter password');
//     if (!validatePassword(pass))
//       return showMessage('Min 8 chars, 1 letter & 1 number');
//     if (pass !== confirmPass) return showMessage('Passwords do not match');

//     auth()
//       .createUserWithEmailAndPassword(email, pass)
//       .then(() => {
//         showMessage('Account created!');
//         props.navigation.navigate('SignIn');
//       })
//       .catch(err => {
//         console.error(err);
//         showMessage('Something went wrong');
//       });
//   }

//   return (
//     <KeyboardAvoidingView
//       style={styles.flex}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <StatusBar translucent backgroundColor="transparent" />

//         {/* Top Image */}
//         <Image source={Icons.splashCorner} style={styles.corner} />

//         {/* Title */}
//        <Text
//           style={{
//             fontSize: normalize(17),
//             color: Colors.black,
//             fontFamily: Fonts.Mochiy_Regular,
//             textAlign: 'center',
//             marginTop: normalize(20),
//           }}>
//           Welcome to Onboard!
//         </Text>
//         <View
//           style={{
//             height: normalize(35),
//             width: '40%',
//             alignSelf: 'center',
//             // backgroundColor: Colors.half_baked,
//             marginTop: normalize(15),
//             marginBottom: normalize(55),
//           }}>
//           <Text
//             style={{
//               textAlign: 'center',
//               fontFamily: Fonts.Poppins_Regular,
//               fontSize: normalize(11),
//               //   color: Colors.black,
//             }}>
//             Let's help to meet your tasks
//           </Text>
//         </View>

//         {/* Inputs */}
//         <View style={styles.inputWrapper}>
//           <TextInput1
//             placeholder="Full Name"
//             value={name}
//             onChangeText={setName}
//             onSubmitEditing={() => emailRef.current.focus()}
//           />

//           <TextInput1
//             placeholder="Email"
//             value={email}
//             refer={emailRef}
//             keyboardType="email-address"
//             onChangeText={setEmail}
//             onSubmitEditing={() => passRef.current.focus()}
//           />

//           <TextInput1
//             secureTextEntry
//             placeholder="Password"
//             value={pass}
//             refer={passRef}
//             onChangeText={setPass}
//             onSubmitEditing={() => confirmPassRef.current.focus()}
//           />

//           <TextInput1
//             secureTextEntry
//             placeholder="Confirm Password"
//             value={confirmPass}
//             refer={confirmPassRef}
//             onChangeText={setConfirmPass}
//           />
//         </View>

//         {/* Button */}
//         <TouchableOpacity style={styles.button} onPress={validation}>
//           <Text style={styles.buttonText}>Create Account</Text>
//         </TouchableOpacity>

//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Already have an account?</Text>
//           <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
//             <Text style={styles.link}> Sign In</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//     backgroundColor: Colors.grey_white,
//   },
//   container: {
//     flexGrow: 1,
//     paddingBottom: normalize(30),
//   },
//   corner: {
//     height: normalize(140),
//     width: normalize(140),
//     resizeMode: 'contain',
//   },
//   title: {
//     fontSize: normalize(16),
//     fontFamily: Fonts.Mochiy_Regular,
//     textAlign: 'center',
//     color: Colors.black,
//     marginTop: normalize(10),
//   },
//   subtitle: {
//     fontSize: normalize(10),
//     fontFamily: Fonts.Poppins_Regular,
//     textAlign: 'center',
//     color: '#666',
//     marginTop: normalize(5),
//     marginBottom: normalize(20),
//   },
//   inputWrapper: {
//     width: '85%',
//     alignSelf: 'center',
//     gap: normalize(12),
//   },
//   button: {
//     height: normalize(45),
//     width: '85%',
//     backgroundColor: Colors.sea_Green,
//     alignSelf: 'center',
//     marginTop: normalize(25),
//     borderRadius: normalize(10),
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//   },
//   buttonText: {
//     fontFamily: Fonts.Poppins_SemiBold,
//     fontSize: normalize(12),
//     color: Colors.white,
//   },
//   footer: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     marginTop: normalize(20),
//   },
//   footerText: {
//     fontFamily: Fonts.Mochiy_Regular,
//     fontSize: normalize(10),
//   },
//   link: {
//     fontFamily: Fonts.Mochiy_Regular,
//     fontSize: normalize(10),
//     color: Colors.sea_Green,
//   },
// });

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
  Animated,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Colors, Fonts, Icons } from '../../themes/Themes';
import normalize from '../../utils/normalize';
import TextInput1 from '../../components/TextInput1';
import showMessage from '../../utils/showMessage';
import auth from '@react-native-firebase/auth';

const SignUp = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [errors, setErrors] = useState({});

  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const scrollRef = useRef();

  const fieldPositions = useRef({});

  const shakeName = useRef(new Animated.Value(0)).current;
  const shakeEmail = useRef(new Animated.Value(0)).current;
  const shakePass = useRef(new Animated.Value(0)).current;
  const shakeConfirm = useRef(new Animated.Value(0)).current;

  const validateEmail = email => /\S+@\S+\.\S+/.test(email);
  const validatePassword = pass =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);

  const triggerShake = anim => {
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const scrollToField = field => {
    const y = fieldPositions.current[field];
    if (y !== undefined && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({ y: y - 80, animated: true });
      }, 150);
    }
  };

  // const validation = () => {
  //   let newErrors = {};

  //   if (!name.trim()) {
  //     newErrors.name = true;
  //     triggerShake(shakeName);
  //     scrollToField('name');
  //   }

  //   if (!validateEmail(email)) {
  //     newErrors.email = true;
  //     triggerShake(shakeEmail);
  //     if (!newErrors.name) scrollToField('email');
  //   }

  //   if (!validatePassword(pass)) {
  //     newErrors.pass = true;
  //     triggerShake(shakePass);
  //     if (!newErrors.name && !newErrors.email) scrollToField('pass');
  //   }

  //   if (pass !== confirmPass) {
  //     newErrors.confirm = true;
  //     triggerShake(shakeConfirm);
  //     if (!newErrors.name && !newErrors.email && !newErrors.pass)
  //       scrollToField('confirm');
  //   }

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length > 0) return;

  //   auth()
  //     .createUserWithEmailAndPassword(email, pass)
  //     .then(() => {
  //       showMessage('Account created!');
  //       props.navigation.navigate('SignIn');
  //     })
  //     .catch(() => showMessage('Something went wrong'));
  // };

  const validation = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = true;
      triggerShake(shakeName);
      scrollToField('name');
    }

    if (!email || !validateEmail(email)) {
      newErrors.email = true;
      triggerShake(shakeEmail);
      if (!newErrors.name) scrollToField('email');
    }

    if (!pass || !validatePassword(pass)) {
      newErrors.pass = true;
      triggerShake(shakePass);
      if (!newErrors.name && !newErrors.email) scrollToField('pass');
    }

    if (!confirmPass || pass !== confirmPass) {
      newErrors.confirm = true;
      triggerShake(shakeConfirm);
      if (!newErrors.name && !newErrors.email && !newErrors.pass)
        scrollToField('confirm');
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        showMessage('Account created!');
        props.navigation.navigate('SignIn');
      })
      .catch(() => showMessage('Something went wrong'));
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar translucent backgroundColor="transparent" />

        <Image source={Icons.splashCorner} style={styles.corner} />

        <Text style={styles.title}>Welcome to Onboard!</Text>

        <Text style={styles.subtitle}>Let's help you manage your tasks</Text>

        <View style={styles.inputWrapper}>
          {/* Name */}
          <Animated.View
            onLayout={e =>
              (fieldPositions.current.name = e.nativeEvent.layout.y)
            }
            style={[
              styles.animated,
              { transform: [{ translateX: shakeName }] },
            ]}
          >
            <TextInput1
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              error={errors.name}
              errorText="Name is required"
            />
          </Animated.View>

          {/* Email */}
          <Animated.View
            onLayout={e =>
              (fieldPositions.current.email = e.nativeEvent.layout.y)
            }
            style={[
              styles.animated,
              { transform: [{ translateX: shakeEmail }] },
            ]}
          >
            <TextInput1
              placeholder="Email"
              value={email}
              refer={emailRef}
              keyboardType="email-address"
              onChangeText={setEmail}
              returnKeyType="next"
              onSubmitEditing={() => passRef.current.focus()}
              error={errors.email}
              errorText="Enter valid email"
            />
          </Animated.View>

          {/* Password */}
          <Animated.View
            onLayout={e =>
              (fieldPositions.current.pass = e.nativeEvent.layout.y)
            }
            style={[
              styles.animated,
              { transform: [{ translateX: shakePass }] },
            ]}
          >
            <TextInput1
              secureTextEntry
              placeholder="Password"
              value={pass}
              refer={passRef}
              onChangeText={setPass}
              returnKeyType="next"
              onSubmitEditing={() => confirmPassRef.current.focus()}
              error={errors.pass}
              errorText="Min 8 chars, 1 letter & 1 number"
            />
          </Animated.View>

          {/* Confirm */}
          <Animated.View
            onLayout={e =>
              (fieldPositions.current.confirm = e.nativeEvent.layout.y)
            }
            style={[
              styles.animated,
              { transform: [{ translateX: shakeConfirm }] },
            ]}
          >
            <TextInput1
              secureTextEntry
              placeholder="Confirm Password"
              value={confirmPass}
              refer={confirmPassRef}
              onChangeText={setConfirmPass}
              returnKeyType="done"
              onSubmitEditing={validation}
              error={errors.confirm}
              errorText="Passwords do not match"
            />
          </Animated.View>
        </View>

        <TouchableOpacity style={styles.button} onPress={validation}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
            <Text style={styles.link}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.grey_white,
  },
  container: {
    flexGrow: 1,
    paddingBottom: normalize(30),
  },
  corner: {
    height: normalize(140),
    width: normalize(140),
    resizeMode: 'contain',
  },
  title: {
    fontSize: normalize(17),
    fontFamily: Fonts.Mochiy_Regular,
    textAlign: 'center',
    color: Colors.black,
    marginTop: normalize(20),
  },
  subtitle: {
    fontSize: normalize(11),
    fontFamily: Fonts.Poppins_Regular,
    textAlign: 'center',
    color: '#666',
    marginTop: normalize(10),
    marginBottom: normalize(30),
  },
  inputWrapper: {
    width: '85%',
    alignSelf: 'center',
    gap: normalize(12),
  },
  animated: {
    width: '100%',
  },
  button: {
    height: normalize(45),
    width: '85%',
    backgroundColor: Colors.sea_Green,
    alignSelf: 'center',
    marginTop: normalize(25),
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
  link: {
    fontFamily: Fonts.Mochiy_Regular,
    fontSize: normalize(10),
    color: Colors.sea_Green,
  },
});
