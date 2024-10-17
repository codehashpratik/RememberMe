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
import {signInSuccess} from '../../redux/reducer/AuthReducer';
import {useDispatch} from 'react-redux';

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
        .then(() => {
          showMessage('Login Successfull!');
          let token = auth().currentUser.uid;
          dispatch(signInSuccess(token));

          console.log(token);
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
          Welcome back!
        </Text>
        <Image
          source={Icons.welcomeBack}
          style={{
            height: normalize(150),
            width: normalize(150),
            resizeMode: 'contain',
            alignSelf: 'center',
            marginVertical: normalize(20),
          }}
        />

        <TextInput1
          placeholder={'Enter your email'}
          value={email}
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
        />

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginVertical: normalize(30),
          }}>
          <Text
            style={{
              fontFamily: Fonts.Mochiy_Regular,
              fontSize: normalize(10),
              color: Colors.sea_Green,
              marginLeft: normalize(4),
            }}>
            Forget Password ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            validation();
          }}
          style={{
            height: normalize(43),
            width: '80%',
            backgroundColor: Colors.sea_Green,
            alignSelf: 'center',
            marginTop: normalize(10),
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
            Login
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
            Dont have an account ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SignUp');
            }}>
            <Text
              style={{
                fontFamily: Fonts.Mochiy_Regular,
                fontSize: normalize(10),
                color: Colors.sea_Green,
                marginLeft: normalize(4),
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
