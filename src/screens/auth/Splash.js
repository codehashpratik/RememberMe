import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Fonts, Icons} from '../../themes/Themes';
import normalize from '../../utils/normalize';

const Splash = props => {
  return (
    <View
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

      <Image
        source={Icons.splashBack}
        style={{
          height: normalize(200),
          width: normalize(200),
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: normalize(40),
        }}
      />
      <Text
        style={{
          fontSize: normalize(15),
          color: Colors.black,
          fontFamily: Fonts.Poppins_SemiBold,
          alignSelf: 'center',
          textAlign: 'center',
          marginTop: normalize(20),
        }}>
        Gets things with TODs
      </Text>
      <View
        style={{
          height: normalize(90),
          width: '60%',
          // backgroundColor: 'orange',
          alignSelf: 'center',
          marginTop: normalize(10),
        }}>
        <Text
          style={{
            fontFamily: Fonts.Poppins_Regular,
            color: Colors.black,
            textAlign: 'center',
          }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A animi
          assumenda, praesentium veritatis necessitatibus numquam.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.replace('SignIn');
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
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;
