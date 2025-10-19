import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Colors, Fonts } from '../themes/Themes'; // adjust path as needed
import normalize from '../utils/normalize'; // your normalize util

const { width } = Dimensions.get('window');

const avatarUrls = Array.from(
  { length: 100 },
  (_, i) => `https://avatar.iran.liara.run/public/${i + 1}`,
);

const AvatarPickerModal = ({ isVisible, onClose, onAvatarSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleSelect = uri => {
    setSelectedAvatar(uri);
  };

  const handleUpdate = () => {
    if (selectedAvatar) {
      onAvatarSelect(selectedAvatar);
      onClose();
    } else {
      alert('Please select an avatar first!');
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Choose Your Avatar</Text>

          <FlatList
            data={avatarUrls}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={[
                  styles.avatarWrapper,
                  selectedAvatar === item && styles.selected,
                ]}
              >
                <Image source={{ uri: item }} style={styles.avatar} />
              </TouchableOpacity>
            )}
          />

          {/* Update button */}
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Your Avatar</Text>
          </TouchableOpacity>

          {/* Close modal */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AvatarPickerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '80%',
    width: '90%',
    backgroundColor: Colors.white || '#fff',
    borderRadius: normalize(10),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(12),
  },
  title: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(14),
    textAlign: 'center',
    marginBottom: normalize(10),
    color: Colors.black || '#000',
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: normalize(20),
  },
  avatarWrapper: {
    borderRadius: normalize(50),
    borderWidth: 2,
    borderColor: 'transparent',
    margin: normalize(6),
    overflow: 'hidden',
    backgroundColor: '#F7F7F7',
  },
  selected: {
    borderColor: Colors.moonstone_blue || '#00AEEF',
  },
  avatar: {
    height: width / 6,
    width: width / 6,
    borderRadius: normalize(50),
  },
  button: {
    backgroundColor: Colors.moonstone_blue || '#00AEEF',
    paddingVertical: normalize(10),
    borderRadius: normalize(6),
    alignItems: 'center',
    marginTop: normalize(10),
  },
  buttonText: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(12),
    color: Colors.white || '#fff',
  },
  closeButton: {
    alignItems: 'center',
    marginTop: normalize(8),
  },
  closeText: {
    fontFamily: Fonts.Poppins_Regular,
    color: Colors.dark_grey || '#555',
  },
});
