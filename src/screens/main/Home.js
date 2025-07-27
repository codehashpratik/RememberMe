import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Icons } from '../../themes/Themes';
import { ScrollView } from 'react-native-gesture-handler';
import normalize from '../../utils/normalize';
import ModalTask from '../../components/ModalTask';
import AnalogClock from '../../components/AnalogClock';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskList, selectTaskList } from '../../redux/reducer/TaskReducer';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const Home = props => {
  const [isVisible, setIsVisible] = useState(false);
  const isFocused = useIsFocused();
  const tasklist = useSelector(selectTaskList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      //Task Data list
      dispatch(getTaskList());
    }
  }, [isFocused]);

  useEffect(() => {
    if (tasklist != null || tasklist.length() > 0) {
      console.log('the list  after useEffect is ::' + JSON.stringify(tasklist));
    }
  }, [tasklist]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
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
        }}
      >
        <View
          style={{
            height: normalize(210),
            width: '100%',
            backgroundColor: Colors.moonstone_blue,
          }}
        >
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
            }}
          >
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
              fontFamily: Fonts.Mochiy_Regular,
              color: Colors.white,
              fontSize: normalize(15),
              textAlign: 'center',
              marginTop: normalize(20),
            }}
          >
            {getGreeting()} Pratik
          </Text>
        </View>
        {/* <Text
          style={{
            alignSelf: 'flex-end',
            marginRight: normalize(20),
            marginTop: normalize(20),
            fontFamily: Fonts.Mochiy_Regular,
            color: 'black',
          }}
        >
          {getGreeting()}
        </Text> */}
        <AnalogClock size={160} />
        <Text
          style={{
            fontSize: normalize(10),
            fontFamily: Fonts.Mochiy_Regular,
            marginLeft: normalize(20),
            marginTop: normalize(20),
            color: Colors.black,
          }}
        >
          Task Lists
        </Text>

        <View
          style={{
            height: normalize(320),
            width: '85%',
            backgroundColor: Colors.white,
            alignSelf: 'center',
            marginTop: normalize(20),
            borderRadius: normalize(8),
            shadowColor: Colors.black,
            elevation: normalize(4),
            marginBottom: normalize(80),
          }}
        >
          <Text
            style={{
              fontSize: normalize(10),
              fontFamily: Fonts.Poppins_Regular,
              marginLeft: normalize(15),
              marginTop: normalize(15),
              color: Colors.black,
            }}
          >
            Daily Task
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}
          >
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
          {/* <ScrollView
            style={{
              // height: normalize(10),
              width: '90%',
              backgroundColor: 'orange',
              alignSelf: 'center',
              marginTop: normalize(10),
              marginBottom: normalize(20),
            }}
          ></ScrollView> */}
          {/* <ScrollView
            style={{
              width: '90%',
              backgroundColor: '#fffff',
              alignSelf: 'center',
              marginTop: normalize(10),
              marginBottom: normalize(20),
            }}
          >
            {tasklist && tasklist.length > 0 ? (
              tasklist.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: Colors.grey_white,
                    padding: normalize(10),
                    borderRadius: normalize(6),
                    marginBottom: normalize(10),
                    shadowColor: Colors.black,
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 3,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Regular,
                      fontSize: normalize(12),
                      color: Colors.black,
                    }}
                  >
                    {item.taskTitle || 'Untitled Task'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Regular,
                      fontSize: normalize(10),
                      color: Colors.dark_grey,
                      marginTop: 4,
                    }}
                  >
                    {item.taskInfo || 'No description'}
                  </Text>
                </View>
              ))
            ) : (
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: normalize(12),
                  color: Colors.black,
                  textAlign: 'center',
                  marginTop: normalize(20),
                }}
              >
                No tasks available
              </Text>
            )}
          </ScrollView> */}
          {/* <FlatList
            data={tasklist}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: normalize(10),
              marginBottom: normalize(20),
            }}
            ListEmptyComponent={() => (
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: normalize(12),
                  color: Colors.black,
                  textAlign: 'center',
                  marginTop: normalize(20),
                }}
              >
                No tasks available
              </Text>
            )}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: Colors.grey_white,
                  padding: normalize(10),
                  borderRadius: normalize(6),
                  marginBottom: normalize(10),
                  shadowColor: Colors.black,
                  shadowOpacity: 0.1,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 3,
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Regular,
                    fontSize: normalize(12),
                    color: Colors.black,
                  }}
                >
                  {item.taskTitle || 'Untitled Task'}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Regular,
                    fontSize: normalize(10),
                    color: Colors.dark_grey,
                    marginTop: 4,
                  }}
                >
                  {item.taskInfo || 'No description'}
                </Text>
              </View>
            )}
          /> */}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: normalize(42),
              alignSelf: 'center',
              backgroundColor: '#56b6bd31',
              // borderRadius: normalize(20),
              borderWidth: 0.5,
              borderColor: '#fff',
              padding: normalize(4),
              // marginVertical: normalize(14),
              marginTop: normalize(14),

              shadowOffset: { width: 0, height: 1 },
            }}
          >
            {['High', 'Medium', 'Low'].map((level, index) => (
              <TouchableOpacity
                key={level}
                onPress={() => console.log(`Pressed: ${level}`)}
                // activeOpacity={0.8}
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  marginHorizontal: normalize(2),
                  borderRadius: normalize(14),
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  // light gradient effect imitation
                  borderWidth: 0.5,
                  borderColor: '#ddd',
                }}
              >
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontFamily: Fonts.Poppins_Medium,
                    color: '#333',
                  }}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              alignSelf: 'center',
              // marginTop: normalize(10),
              marginBottom: normalize(20),
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Your FlatList goes here inside */}
            <FlatList
              data={tasklist}
              scrollEnabled={false} // 🔴 disables internal scroll
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                padding: normalize(10),
              }}
              ListEmptyComponent={() => (
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Regular,
                    fontSize: normalize(12),
                    color: Colors.black,
                    textAlign: 'center',
                    marginTop: normalize(20),
                  }}
                >
                  No tasks available
                </Text>
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.grey_white,
                    padding: normalize(10),
                    borderRadius: normalize(6),
                    marginBottom: normalize(10),
                    shadowColor: Colors.black,
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 3,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Regular,
                      fontSize: normalize(12),
                      color: Colors.black,
                    }}
                  >
                    {item.taskTitle || 'Untitled Task'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Regular,
                      fontSize: normalize(10),
                      color: Colors.dark_grey,
                      marginTop: 4,
                    }}
                  >
                    {item.taskInfo || 'No description'}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
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
