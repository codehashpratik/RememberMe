import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import normalize from '../utils/normalize';
import {Colors, Fonts, Icons} from '../themes/Themes';

const TextInput1 = props => {
  const [isSecure, setIsSecure] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  function onChange(_value) {
    if (props.onChangeText) {
      props.onChangeText(_value);
    }
  }

  function onSubmit() {
    if (props.onSubmitEditing) {
      props.onSubmitEditing();
    }
  }

  useEffect(() => {
    if (props?.secureTextEntry == true) {
      setIsSecure(props?.secureTextEntry);
    }
  }, [props?.secureTextEntry]);
  return (
    <View
      style={{
        height: normalize(40),
        width: '85%',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        marginVertical: props?.marginV,
        borderRadius: normalize(10),
        flexDirection: 'row',
        borderColor: isFocus ? Colors.sea_Green : Colors.grey_white,
        borderWidth: normalize(1),
      }}>
      <TextInput
        placeholder={props?.placeholder}
        placeholderTextColor={'#b3b6c7'}
        secureTextEntry={isSecure}
        onChangeText={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        returnKeyType={props?.returnKeyType}
        onSubmitEditing={onSubmit}
        value={props.value}
        keyboardType={props?.keyboardType}
        ref={props?.refer}
        style={{
          height: '100%',
          width: '80%',
          textAlign: props?.textAlign,
          fontSize: normalize(12),
          color: Colors.black,
          fontFamily: Fonts.Poppins_Regular,
          borderRadius: normalize(9),
          marginHorizontal: normalize(12),

          // paddingLeft: normalize(10),
        }}
      />
      {props?.secureTextEntry && (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={{
            height: '100%',

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={isSecure ? Icons.hide : Icons.show}
            style={{
              width: 26,
              height: 26,
              resizeMode: 'contain',
              tintColor: '#b3b6c7',
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

TextInput1.propTypes = {
  height: PropTypes.any,
  width: PropTypes.any,
  value: PropTypes.string,
  tintColor: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.any,
  title: PropTypes.string,
  onChangeText: PropTypes.func,
  keyboardType: PropTypes.func,
  secureTextEntry: PropTypes.string,
  returnKeyType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  marginV: PropTypes.number,
  marginH: PropTypes.number,
  marginR: PropTypes.number,
  marginL: PropTypes.number,
  marginB: PropTypes.number,
  marginS: PropTypes.number,
  marginE: PropTypes.number,
  marginT: PropTypes.number,
  padding: PropTypes.number,
  margin: PropTypes.number,
  paddingV: PropTypes.number,
  paddingH: PropTypes.number,
  paddingR: PropTypes.number,
  paddingL: PropTypes.number,
  paddingB: PropTypes.number,
  paddingS: PropTypes.number,
  paddingE: PropTypes.number,
  paddingT: PropTypes.number,
  backgroundColor: PropTypes.string,
  textAlign: PropTypes.string,
};

TextInput1.defaultProps = {
  title: 'title',
  placeholder: 'placeholder',
  keyboardType: 'default',
  marginV: normalize(10),
};

export default TextInput1;
