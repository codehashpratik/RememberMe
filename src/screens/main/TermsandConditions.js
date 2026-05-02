import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { Colors, Fonts, Icons } from '../../themes/Themes';
import normalize from '../../utils/normalize';

const TermsandConditions = props => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}
      >
        <View
          style={{
            height: normalize(50),
            width: '100%',
            // backgroundColor: 'red',
            marginTop: normalize(40),
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: normalize(30),
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.openDrawer()}
            style={{
              height: '100%',
              width: normalize(45),
              borderRadius: normalize(5),
              // borderColor: Colors.half_baked,
              // borderWidth: 1,
              marginLeft: normalize(10),
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Image
              source={Icons.drawer}
              style={{
                height: normalize(30),
                width: normalize(40),
                resizeMode: 'contain',
                tintColor: Colors.half_baked,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              height: '100%',
            }}
          >
            <Text style={styles.title}>Terms & Conditions</Text>

            <Text style={styles.date}>Effective Date: 2026</Text>
          </View>
        </View>

        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.paragraph}>
              Welcome to Remember Me. By using this app, you agree to the
              following terms and conditions. Please read them carefully.
            </Text>

            <Text style={styles.heading}>1. Use of the App</Text>
            <Text style={styles.paragraph}>
              Remember Me is a task management application that helps you
              organize your daily activities. You agree to use the app only for
              lawful purposes.
            </Text>

            <Text style={styles.heading}>2. User Accounts</Text>
            <Text style={styles.paragraph}>
              You are responsible for maintaining the confidentiality of your
              account and all activities under it. Ensure your login details are
              secure.
            </Text>

            <Text style={styles.heading}>3. Data & Privacy</Text>
            <Text style={styles.paragraph}>
              We may store your basic information and task data to provide app
              functionality. Your data is not sold to third parties.
            </Text>

            <Text style={styles.heading}>4. User Content</Text>
            <Text style={styles.paragraph}>
              You retain ownership of your tasks and data. However, we are not
              responsible for any data loss.
            </Text>

            <Text style={styles.heading}>5. App Availability</Text>
            <Text style={styles.paragraph}>
              We do not guarantee uninterrupted access. Features may be updated
              or modified at any time.
            </Text>

            <Text style={styles.heading}>6. Prohibited Activities</Text>
            <Text style={styles.paragraph}>
              You agree not to misuse the app, attempt hacking, or engage in
              harmful activities.
            </Text>

            <Text style={styles.heading}>7. Limitation of Liability</Text>
            <Text style={styles.paragraph}>
              The app is provided "as is" without warranties. We are not
              responsible for damages arising from its use.
            </Text>

            <Text style={styles.heading}>8. Termination</Text>
            <Text style={styles.paragraph}>
              We may suspend or terminate your account if you violate these
              terms.
            </Text>

            <Text style={styles.heading}>9. Changes to Terms</Text>
            <Text style={styles.paragraph}>
              We may update these terms from time to time. Continued use means
              you accept the changes.
            </Text>

            <Text style={styles.heading}>10. Contact Us</Text>
            <Text style={styles.paragraph}>
              For any questions, contact us at: Pratickmajee@gmail.com
            </Text>

            <View style={{ height: normalize(40) }} />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default TermsandConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: normalize(16),
    paddingTop: normalize(20),
  },
  title: {
    fontSize: normalize(18),
    fontFamily: Fonts.Poppins_SemiBold,
    color: Colors.moonstone_blue,
    // marginBottom: normalize(10),
    textAlign: 'center',
    // marginTop: normalize(10),
  },
  date: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Regular,
    color: Colors.grey,
    textAlign: 'center',
    marginBottom: normalize(15),
  },
  heading: {
    fontSize: normalize(13),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.sea_Green,
    marginTop: normalize(12),
    marginBottom: normalize(5),
  },
  paragraph: {
    fontSize: normalize(11),
    fontFamily: Fonts.Poppins_Regular,
    color: Colors.black,
    lineHeight: normalize(18),
  },
});
