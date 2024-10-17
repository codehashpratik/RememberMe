import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {Colors, Fonts, Icons} from '../themes/Themes';
import normalize from '../utils/normalize';

const CustomDrawer = props => {
  const {state, descriptors, navigation} = props;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.grey_white,
      }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors.grey_white,
        }}>
        <TouchableOpacity
          style={{
            height: normalize(85),
            width: normalize(85),
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: normalize(60),
          }}>
          <Image
            source={Icons.welcomeBack}
            style={{
              height: normalize(100),
              width: normalize(100),
              resizeMode: 'contain',
              borderWidth: 2,
              borderColor: Colors.moonstone_blue,

              borderRadius: normalize(100),
            }}
          />
          <View
            style={{
              height: normalize(30),
              width: normalize(30),
              backgroundColor: Colors.white,
              borderRadius: normalize(100),
              position: 'absolute',
              top: normalize(65),
              left: normalize(55),
              shadowColor: Colors.black,
              elevation: normalize(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Icons.edit}
              style={{
                height: normalize(15),
                width: normalize(15),
                resizeMode: 'contain',
                tintColor: Colors.moonstone_blue,
              }}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: Fonts.Mochiy_Regular,
            textAlign: 'center',
            fontSize: normalize(17),
            marginTop: normalize(30),
            color: Colors.black,
          }}>
          Pratik Majee
        </Text>
        <Text
          style={{
            fontFamily: Fonts.Poppins_Regular,
            textAlign: 'center',
            fontSize: normalize(10),
            marginTop: normalize(5),
            color: Colors.moonstone_blue,
          }}>
          Pratickmajee@gmail.com
        </Text>
        <View
          style={{
            height: 0.7,
            width: '85%',
            alignSelf: 'center',
            backgroundColor: Colors.moonstone_blue,
            marginTop: normalize(10),
          }}></View>
        {state.routes.map((item, index) => {
          const {options} = descriptors[item.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : item.name;

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: item.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(item.name, item.params);
            }
          };
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onPress()}
              style={{
                height: normalize(50),
                width: '90%',
                backgroundColor: isFocused
                  ? Colors.sea_Green
                  : Colors.grey_white,
                marginTop: normalize(15),
                flexDirection: 'row',
                alignSelf: 'center',
                borderRadius: normalize(11),
                alignItems: 'center',
              }}>
              <Image
                source={
                  index == 0
                    ? Icons.home
                    : index == 1
                    ? Icons.about
                    : Icons.contact
                }
                style={{
                  resizeMode: 'contain',
                  height: normalize(18),
                  width: normalize(18),
                  marginRight: normalize(10),
                  marginLeft: normalize(10),
                  tintColor: isFocused ? Colors.white : Colors.sea_Green,
                }}
              />
              <Text
                style={{
                  color: isFocused ? Colors.white : Colors.sea_Green,
                  fontSize: normalize(13),
                  fontFamily: Fonts.Poppins_Regular,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <View
          style={{
            height: 0.7,
            width: '85%',
            alignSelf: 'center',
            backgroundColor: Colors.moonstone_blue,
            marginTop: normalize(130),
          }}></View>
        <TouchableOpacity
          style={{
            height: normalize(40),
            width: '90%',
            backgroundColor: Colors.lavender,
            marginTop: normalize(25),
            flexDirection: 'row',
            alignSelf: 'center',
            borderRadius: normalize(11),
            alignItems: 'center',
          }}>
          <Image
            source={Icons.share}
            style={{
              resizeMode: 'contain',
              height: normalize(18),
              width: normalize(18),
              marginRight: normalize(5),
              marginLeft: normalize(10),
              tintColor: Colors.sea_Green,
            }}
          />
          <Text
            style={{
              fontSize: normalize(13),
              fontFamily: Fonts.Poppins_Regular,
              color: Colors.sea_Green,
              marginLeft: normalize(10),
            }}>
            Tell a Friend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: normalize(40),
            width: '90%',
            backgroundColor: Colors.lavender,
            // marginTop: normalize(15),
            flexDirection: 'row',
            alignSelf: 'center',
            borderRadius: normalize(11),
            alignItems: 'center',
          }}>
          <Image
            source={Icons.logout}
            style={{
              resizeMode: 'contain',
              height: normalize(18),
              width: normalize(18),
              marginRight: normalize(5),
              marginLeft: normalize(10),
              tintColor: Colors.sea_Green,
            }}
          />
          <Text
            style={{
              fontSize: normalize(13),
              fontFamily: Fonts.Poppins_Regular,
              color: Colors.sea_Green,
              marginLeft: normalize(10),
            }}>
            Log out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CustomDrawer;
