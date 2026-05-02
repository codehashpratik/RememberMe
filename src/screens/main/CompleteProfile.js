// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import { Colors, Fonts } from '../../themes/Themes';
// import normalize from '../../utils/normalize';
// import showMessage from '../../utils/showMessage';

// const CompleteProfile = ({ navigation, onProfileComplete }) => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [avatars, setAvatars] = useState([]);
//   const [selectedAvatar, setSelectedAvatar] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (name.trim().length > 1) {
//       const [firstName, ...rest] = name.trim().split(' ');
//       const lastName = rest.join(' ');
//       const urls = Array.from({ length: 5 }).map(
//         (_, i) =>
//           `https://api.dicebear.com/9.x/initials/png?seed=${firstName}_${
//             lastName || i
//           }`,
//       );
//       setAvatars(urls);
//     }
//   }, [name]);

//   const handleSaveProfile = async () => {
//     if (!name || !mobile || !selectedAvatar) {
//       showMessage('Please fill all fields and select an avatar.');
//       return;
//     }
//     setLoading(true);
//     try {
//       const uid = auth().currentUser?.uid;
//       await firestore().collection('users').doc(uid).set({
//         name,
//         mobile,
//         avatar: selectedAvatar,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//       });

//       showMessage('Profile completed successfully!');
//       if (onProfileComplete) {
//         await onProfileComplete(); // 🔁 recheck firestore
//       }
//       navigation.replace('DrawerSection');
//     } catch (err) {
//       console.error('Error saving profile:', err);
//       showMessage('Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView
//       contentContainerStyle={{
//         flexGrow: 1,
//         backgroundColor: Colors.white,
//         padding: normalize(20),
//       }}
//     >
//       <Text
//         style={{
//           fontFamily: Fonts.Poppins_SemiBold,
//           fontSize: normalize(15),
//           textAlign: 'center',
//           marginBottom: normalize(20),
//         }}
//       >
//         Complete Your Profile
//       </Text>

//       <TextInput
//         placeholder="Enter your full name"
//         value={name}
//         onChangeText={setName}
//         style={{
//           borderWidth: 1,
//           borderColor: Colors.grey,
//           borderRadius: 8,
//           padding: 10,
//           marginBottom: 15,
//         }}
//       />

//       <TextInput
//         placeholder="Enter mobile number"
//         keyboardType="phone-pad"
//         value={mobile}
//         onChangeText={setMobile}
//         style={{
//           borderWidth: 1,
//           borderColor: Colors.grey,
//           borderRadius: 8,
//           padding: 10,
//           marginBottom: 15,
//         }}
//       />

//       {avatars.length > 0 && (
//         <>
//           <Text
//             style={{
//               fontFamily: Fonts.Poppins_Medium,
//               fontSize: normalize(12),
//               marginBottom: 10,
//             }}
//           >
//             Choose an Avatar:
//           </Text>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {avatars.map((url, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => setSelectedAvatar(url)}
//                 style={{
//                   borderWidth: selectedAvatar === url ? 2 : 0,
//                   borderColor: Colors.sea_Green,
//                   borderRadius: 50,
//                   marginRight: 10,
//                 }}
//               >
//                 <Image
//                   source={{ uri: url }}
//                   style={{
//                     width: 70,
//                     height: 70,
//                     borderRadius: 35,
//                   }}
//                 />
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </>
//       )}

//       <TouchableOpacity
//         onPress={handleSaveProfile}
//         disabled={loading}
//         style={{
//           height: normalize(43),
//           width: '100%',
//           backgroundColor: Colors.sea_Green,
//           marginTop: normalize(30),
//           borderRadius: normalize(9),
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text
//           style={{
//             fontFamily: Fonts.Poppins_SemiBold,
//             fontSize: normalize(12),
//             color: Colors.white,
//           }}
//         >
//           {loading ? 'Saving...' : 'Save Profile'}
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default CompleteProfile;

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Colors, Fonts } from '../../themes/Themes';
import normalize from '../../utils/normalize';
import showMessage from '../../utils/showMessage';
import TextInput1 from '../../components/TextInput1';

const CompleteProfile = ({ navigation, onProfileComplete }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const scrollRef = useRef();
  const mobileRef = useRef();

  const fieldPositions = useRef({});
  const shakeName = useRef(new Animated.Value(0)).current;
  const shakeMobile = useRef(new Animated.Value(0)).current;
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const ageRef = useRef();

  const shakeAge = useRef(new Animated.Value(0)).current;
  const shakeGender = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (name.trim().length > 1) {
      const [firstName, ...rest] = name.trim().split(' ');
      const lastName = rest.join(' ');

      const styles = ['initials', 'adventurer', 'avataaars', 'micah'];

      const urls = Array.from({ length: 8 }).map((_, i) => {
        const style = styles[i % styles.length];

        // 🔥 FORCE DIFFERENT LOOKS
        const seed = `${firstName}_${lastName}_${Math.random()}_${i}`;

        return `https://api.dicebear.com/9.x/${style}/png?seed=${seed}&v=${Date.now()}`;
      });

      setAvatars(urls);
    }
  }, [name]);

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

  const validateMobile = num =>
    /^[6-9]\d{9}$/.test(num) && !/^(\d)\1{9}$/.test(num);

  const handleSaveProfile = async () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = true;
      triggerShake(shakeName);
      scrollToField('name');
    }

    if (!validateMobile(mobile)) {
      newErrors.mobile = true;
      triggerShake(shakeMobile);
      if (!newErrors.name) scrollToField('mobile');
    }
    if (!age || isNaN(age) || Number(age) < 10) {
      newErrors.age = true;
      triggerShake(shakeAge);
      if (!newErrors.name && !newErrors.mobile) scrollToField('age');
    }

    if (!gender) {
      newErrors.gender = true;
      triggerShake(shakeGender);
      if (!newErrors.name && !newErrors.mobile && !newErrors.age)
        scrollToField('gender');
    }

    if (!selectedAvatar) {
      showMessage('Please select an avatar');
      if (!newErrors.name && !newErrors.mobile)
        scrollRef.current.scrollToEnd({ animated: true });
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0 || !selectedAvatar) return;

    setLoading(true);
    try {
      const uid = auth().currentUser?.uid;

      await firestore().collection('users').doc(uid).set({
        fullName,
        mobile,
        age,
        gender,
        avatarUrl: selectedAvatar,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      showMessage('Profile completed successfully!');

      if (onProfileComplete) {
        await onProfileComplete();
      }

      navigation.replace('DrawerSection');
    } catch (err) {
      console.error(err);
      showMessage('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Complete Your Profile</Text>

        {/* NAME */}
        <Animated.View
          onLayout={e => (fieldPositions.current.name = e.nativeEvent.layout.y)}
          style={{
            transform: [{ translateX: shakeName }],
            marginBottom: normalize(12),
          }}
        >
          <TextInput1
            placeholder="Full Name"
            value={name}
            onChangeText={text => {
              setName(text);
              if (errors.name) setErrors(prev => ({ ...prev, name: false }));
            }}
            returnKeyType="next"
            onSubmitEditing={() => mobileRef.current.focus()}
            error={errors.name}
            errorText="Name is required"
          />
        </Animated.View>

        {/* MOBILE */}
        <Animated.View
          onLayout={e =>
            (fieldPositions.current.mobile = e.nativeEvent.layout.y)
          }
          style={{
            transform: [{ translateX: shakeMobile }],
            marginBottom: normalize(12),
          }}
        >
          <TextInput1
            placeholder="Mobile Number"
            value={mobile}
            refer={mobileRef}
            keyboardType="phone-pad"
            onChangeText={text => {
              setMobile(text);
              if (errors.mobile)
                setErrors(prev => ({ ...prev, mobile: false }));
            }}
            returnKeyType="done"
            onSubmitEditing={handleSaveProfile}
            error={errors.mobile}
            errorText="Enter valid mobile number"
          />
        </Animated.View>

        <Animated.View
          onLayout={e => (fieldPositions.current.age = e.nativeEvent.layout.y)}
          style={{
            transform: [{ translateX: shakeAge }],
            marginBottom: normalize(12),
          }}
        >
          <TextInput1
            placeholder="Age"
            value={age}
            refer={ageRef}
            keyboardType="numeric"
            onChangeText={text => {
              setAge(text);
              if (errors.age) setErrors(prev => ({ ...prev, age: false }));
            }}
            returnKeyType="done"
            onSubmitEditing={() => {}}
            error={errors.age}
            errorText="Enter valid age"
          />
        </Animated.View>

        <Animated.View
          onLayout={e =>
            (fieldPositions.current.gender = e.nativeEvent.layout.y)
          }
          style={{
            transform: [{ translateX: shakeGender }],
            marginBottom: normalize(12),
          }}
        >
          <Text style={styles.avatarTitle}>You identify as</Text>

          <View style={styles.radioContainer}>
            {['Him', 'Her', 'They/Them', 'Other'].map(item => (
              <TouchableOpacity
                key={item}
                style={styles.radioItem}
                onPress={() => {
                  setGender(item);
                  if (errors.gender)
                    setErrors(prev => ({ ...prev, gender: false }));
                }}
              >
                <View style={styles.radioOuter}>
                  {gender === item && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {errors.gender && (
            <Text style={styles.errorText}>Please select one option</Text>
          )}
        </Animated.View>

        {/* AVATARS */}
        {avatars.length > 0 && (
          <>
            <Text style={styles.avatarTitle}>Choose an Avatar</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {avatars.map((url, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedAvatar(url)}
                  style={[
                    styles.avatarWrapper,
                    selectedAvatar === url && styles.selectedAvatar,
                  ]}
                >
                  <Image source={{ uri: url }} style={styles.avatar} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {/* BUTTON */}
        <TouchableOpacity
          onPress={handleSaveProfile}
          disabled={loading}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : 'Save Profile'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },

  container: {
    flexGrow: 1,
    padding: normalize(20),
  },

  title: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(15),
    textAlign: 'center',
    marginBottom: normalize(20),
    marginTop: normalize(30),
  },

  avatarTitle: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(12),
    marginTop: normalize(15),
    marginBottom: normalize(10),
  },

  avatarWrapper: {
    marginRight: 10,
    borderRadius: 50,
    // backgroundColor: 'red',
    height: normalize(70),
    width: normalize(70),
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedAvatar: {
    borderWidth: 2,
    borderColor: Colors.sea_Green,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  button: {
    height: normalize(45),
    backgroundColor: Colors.sea_Green,
    marginTop: normalize(30),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(12),
    color: Colors.white,
  },
  radioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(10),
  },

  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: normalize(15),
    marginBottom: normalize(10),
  },

  radioOuter: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.sea_Green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },

  radioInner: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: Colors.sea_Green,
  },

  radioText: {
    fontSize: normalize(11),
    fontFamily: Fonts.Poppins_Regular,
  },

  errorText: {
    color: '#EF4444',
    fontSize: normalize(10),
    marginTop: 4,
  },
});
