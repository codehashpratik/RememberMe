import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import normalize from '../utils/normalize';
import {Colors, Fonts} from '../themes/Themes';

const ModalTask = ({isVisible = false, onBackdropPress = () => {}}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.5}
      animationIn={'zoomIn'}
      animationOut={'slideOutDown'}
      animationInTiming={700}
      animationOutTiming={800}
      onBackButtonPress={() => onBackdropPress()}
      onBackdropPress={() => onBackdropPress()}
      style={{
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        margin: 0,
        padding: 0,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '90%',
              height: normalize(350),
              backgroundColor: 'white',
              marginTop: normalize(190),
              alignSelf: 'center',
              borderTopLeftRadius: normalize(15),
              borderTopRightRadius: normalize(15),
              paddingHorizontal: normalize(15),
              paddingVertical: normalize(30),
              borderBottomLeftRadius: normalize(15),
              borderBottomRightRadius: normalize(15),
            }}></View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalTask;
