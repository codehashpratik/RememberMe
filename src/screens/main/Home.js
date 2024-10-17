import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Icons} from '../../themes/Themes';
import {ScrollView} from 'react-native-gesture-handler';
import normalize from '../../utils/normalize';
import ModalTask from '../../components/ModalTask';

const Home = props => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
        showHideTransition={'slide'}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors.grey_white,
        }}>
        <View
          style={{
            height: normalize(210),
            width: '100%',
            backgroundColor: Colors.moonstone_blue,
          }}>
          <Image
            source={Icons.splashCorner}
            style={{
              height: normalize(150),
              width: normalize(150),
              resizeMode: 'contain',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              props.navigation.openDrawer();
            }}
            style={{
              height: normalize(32),
              width: normalize(45),
              borderRadius: normalize(5),
              borderColor: Colors.white,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: normalize(40),
              left: normalize(20),
            }}>
            <Image
              source={Icons.drawer}
              style={{
                height: normalize(30),
                width: normalize(40),
                resizeMode: 'contain',
                tintColor: Colors.white,
              }}
            />
          </TouchableOpacity>
          <Image
            source={Icons.welcomeBack}
            style={{
              height: normalize(60),
              width: normalize(60),
              resizeMode: 'contain',
              borderWidth: 2,
              borderColor: Colors.white,
              alignSelf: 'center',
              borderRadius: normalize(100),
              position: 'absolute',
              bottom: normalize(70),
            }}
          />
          <Text
            style={{
              fontFamily: Fonts.roboto_Thin,
              color: Colors.white,
              fontSize: normalize(16),
              textAlign: 'center',
              marginTop: normalize(20),
            }}>
            Welcome Pratik !
          </Text>
        </View>
        <Text
          style={{
            fontSize: normalize(13),
            fontFamily: Fonts.Poppins_SemiBold,
            marginLeft: normalize(15),
            marginTop: normalize(20),
            color: Colors.black,
          }}>
          Task Lists
        </Text>

        <View
          style={{
            height: normalize(330),
            width: '85%',
            backgroundColor: Colors.white,
            alignSelf: 'center',
            marginTop: normalize(20),
            borderRadius: normalize(8),
            shadowColor: Colors.black,
            elevation: normalize(4),
          }}>
          <Text
            style={{
              fontSize: normalize(10),
              fontFamily: Fonts.Poppins_Regular,
              marginLeft: normalize(15),
              marginTop: normalize(15),
              color: Colors.black,
            }}>
            Daily Task
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}>
            <Image
              source={Icons.add}
              style={{
                height: normalize(20),
                width: normalize(20),
                resizeMode: 'contain',
                position: 'absolute',
                right: normalize(20),
                top: normalize(-20),
                tintColor: Colors.sea_Green,
              }}
            />
          </TouchableOpacity>
          <ScrollView
            style={{
              // height: normalize(10),
              width: '85%',
              backgroundColor: 'orange',
              alignSelf: 'center',
              marginTop: normalize(10),
              marginBottom: normalize(20),
            }}></ScrollView>
        </View>
      </ScrollView>
      <ModalTask
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
      />
    </View>
  );
};

export default Home;
