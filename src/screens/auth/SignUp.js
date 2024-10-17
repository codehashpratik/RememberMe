import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors, Fonts, Icons} from '../../themes/Themes';
import normalize from '../../utils/normalize';
import TextInput1 from '../../components/TextInput1';
import showMessage from '../../utils/showMessage';
import auth from '@react-native-firebase/auth';
import connectionrequest from '../../utils/NetInfo';

const SignUp = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validatePassword(pass) {
    var vp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return vp.test(pass);
  }

  function validation() {
    if (name == '') {
      showMessage('Please enter your full name');
    } else if (email == '') {
      showMessage('Please enter your email address');
    } else if (!validateEmail(email)) {
      showMessage('Please enter a valid email address');
    } else if (pass == '') {
      showMessage('Please enter password');
    } else if (!validatePassword(pass)) {
      showMessage(
        'Password must contain Minimum eight characters, at least one letter and one number',
      );
    } else {
      // connectionrequest()
      //   .then(state => {
      //     if (state) {
      //       auth()
      //         .createUserWithEmailAndPassword(email, password)
      //         .then(() => {
      //           console.log('User account created Successfully!');
      //           props.navigation.navigate('SignIn');
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
      //   })
      //   .catch(error => {
      //     showMessage('Please connect to the internet');
      //   });
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          showMessage('User account created Successfully!');
          props.navigation.navigate('SignIn');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors.grey_white,
        }}>
        {/* <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} /> */}
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle={'dark-content'}
          showHideTransition={'slide'}
        />
        <Image
          source={Icons.splashCorner}
          style={{
            height: normalize(150),
            width: normalize(150),
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            fontSize: normalize(13),
            color: Colors.black,
            fontFamily: Fonts.Mochiy_Regular,
            textAlign: 'center',
            marginTop: normalize(20),
          }}>
          Welcome to Onboard!
        </Text>
        <View
          style={{
            height: normalize(35),
            width: '40%',
            alignSelf: 'center',
            // backgroundColor: Colors.half_baked,
            marginTop: normalize(15),
            marginBottom: normalize(55),
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.Mochiy_Regular,
              fontSize: normalize(9),
              //   color: Colors.black,
            }}>
            Let's help to meet your tasks
          </Text>
        </View>
        <TextInput1
          placeholder={'Enter your full name'}
          value={name}
          onChangeText={e => {
            setName(e);
          }}
          onSubmitEditing={() => {
            emailRef.current.focus();
          }}
        />
        <TextInput1
          placeholder={'Enter your email'}
          value={email}
          refer={emailRef}
          onChangeText={e => {
            setEmail(e);
          }}
          onSubmitEditing={() => {
            passRef.current.focus();
          }}
        />
        <TextInput1
          secureTextEntry={true}
          placeholder={'Enter password'}
          value={pass}
          refer={passRef}
          onChangeText={e => {
            setPass(e);
          }}
          onSubmitEditing={() => {
            confirmPassRef.current.focus();
          }}
        />
        <TextInput1
          secureTextEntry={true}
          placeholder={'Confirm password'}
          value={confirmPass}
          refer={confirmPassRef}
          onChangeText={e => {
            setConfirmPass(e);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            validation();
          }}
          style={{
            height: normalize(43),
            width: '80%',
            backgroundColor: Colors.sea_Green,
            alignSelf: 'center',
            marginTop: normalize(40),
            borderRadius: normalize(9),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_SemiBold,
              fontSize: normalize(12),
              color: Colors.white,
            }}>
            Register
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            height: normalize(30),
            width: '70%',

            alignSelf: 'center',
            marginTop: normalize(17),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Mochiy_Regular,
              fontSize: normalize(10),
            }}>
            Already have an account ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SignIn');
            }}>
            <Text
              style={{
                fontFamily: Fonts.Mochiy_Regular,
                fontSize: normalize(10),
                color: Colors.sea_Green,
                marginLeft: normalize(4),
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
