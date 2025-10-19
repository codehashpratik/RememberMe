import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Colors, Fonts } from '../../themes/Themes';
import normalize from '../../utils/normalize';
import showMessage from '../../utils/showMessage';

const CompleteProfile = ({ navigation, onProfileComplete }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name.trim().length > 1) {
      const [firstName, ...rest] = name.trim().split(' ');
      const lastName = rest.join(' ');
      const urls = Array.from({ length: 5 }).map(
        (_, i) =>
          `https://avatar.iran.liara.run/username?username=${firstName}+${
            lastName || i
          }`,
      );
      setAvatars(urls);
    }
  }, [name]);

  const handleSaveProfile = async () => {
    if (!name || !mobile || !selectedAvatar) {
      showMessage('Please fill all fields and select an avatar.');
      return;
    }
    setLoading(true);
    try {
      const uid = auth().currentUser?.uid;
      await firestore().collection('users').doc(uid).set({
        name,
        mobile,
        avatar: selectedAvatar,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      showMessage('Profile completed successfully!');
      if (onProfileComplete) {
        await onProfileComplete(); // 🔁 recheck firestore
      }
      navigation.replace('DrawerSection');
    } catch (err) {
      console.error('Error saving profile:', err);
      showMessage('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.white,
        padding: normalize(20),
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.Poppins_SemiBold,
          fontSize: normalize(15),
          textAlign: 'center',
          marginBottom: normalize(20),
        }}
      >
        Complete Your Profile
      </Text>

      <TextInput
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: Colors.grey,
          borderRadius: 8,
          padding: 10,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
        style={{
          borderWidth: 1,
          borderColor: Colors.grey,
          borderRadius: 8,
          padding: 10,
          marginBottom: 15,
        }}
      />

      {avatars.length > 0 && (
        <>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              fontSize: normalize(12),
              marginBottom: 10,
            }}
          >
            Choose an Avatar:
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {avatars.map((url, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedAvatar(url)}
                style={{
                  borderWidth: selectedAvatar === url ? 2 : 0,
                  borderColor: Colors.sea_Green,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              >
                <Image
                  source={{ uri: url }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      <TouchableOpacity
        onPress={handleSaveProfile}
        disabled={loading}
        style={{
          height: normalize(43),
          width: '100%',
          backgroundColor: Colors.sea_Green,
          marginTop: normalize(30),
          borderRadius: normalize(9),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.Poppins_SemiBold,
            fontSize: normalize(12),
            color: Colors.white,
          }}
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CompleteProfile;
