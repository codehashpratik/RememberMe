import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView, // <-- use ScrollView from react-native
} from 'react-native';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Colors, Fonts, Icons } from '../../themes/Themes';
import normalize from '../../utils/normalize';
import ModalTask from '../../components/ModalTask';
import AnalogClock from '../../components/AnalogClock';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTaskList,
  resetTaskStatus,
  selectTaskList,
} from '../../redux/reducer/TaskReducer';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const Home = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();
  const tasklist = useSelector(selectTaskList) || [];
  const dispatch = useDispatch();

  // fetchTasks - always resolves so we can stop loaders reliably
  const fetchTasks = useCallback(async () => {
    try {
      console.log('fetchTasks: start');
      dispatch(resetTaskStatus());
      setLoading(prev => true);
      // Wrap dispatch in Promise.resolve so it works whether your thunk returns a promise or not
      await Promise.resolve(dispatch(getTaskList()));
      console.log('fetchTasks: dispatch finished');
    } catch (err) {
      console.warn('fetchTasks error', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
      console.log('fetchTasks: finished, loading/refreshing false');
    }
  }, [dispatch]);

  const handleEditTask = useCallback(item => {
    // You can reuse your ModalTask for editing
    // For now, pass selected task to modal and open it
    setSelectedPriority(item.priority);
    setIsVisible(true);
    // Later you can enhance ModalTask to accept "editingTask" prop and prefill fields
  }, []);

  // Handle Mark Completed
  const handleMarkComplete = useCallback(
    async item => {
      try {
        if (!item.id) {
          console.warn('No document ID found for task:', item);
          return;
        }

        setLoading(true);

        const currentUser = auth().currentUser;
        if (!currentUser) throw new Error('User not authenticated');

        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('tasks')
          .doc(item.id)
          .update({ status: 'completed' });

        console.log(`✅ Task "${item.taskTitle}" marked completed`);
        await fetchTasks(); // refresh UI
      } catch (err) {
        console.error('❌ Error marking task complete:', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchTasks],
  );

  useEffect(() => {
    if (isFocused) {
      fetchTasks();
    }
  }, [isFocused, fetchTasks]);

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    console.log('onRefresh triggered');
    setRefreshing(true);
    // start a fetch; fetchTasks will turn refreshing off in finally
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    if (!selectedPriority) return tasklist;
    return tasklist.filter(
      task =>
        task.priority &&
        task.priority.toString().toLowerCase() ===
          selectedPriority.toLowerCase(),
    );
  }, [tasklist, selectedPriority]);

  // show loader if initial loading OR when user triggers refresh
  const showLoader = loading || refreshing;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
        showHideTransition={'slide'}
      />

      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.grey_white }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.moonstone_blue]} // android
            tintColor={Colors.moonstone_blue} // ios
          />
        }
        // important: allow pull to trigger even if content smaller than screen
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
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
            onPress={() => props.navigation.openDrawer()}
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

        {/* Task Card */}
        <View
          style={{
            minHeight: normalize(320),
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

          <TouchableOpacity onPress={() => setIsVisible(true)}>
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

          {/* Priority Filter Buttons */}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: normalize(42),
              alignSelf: 'center',
              backgroundColor: '#56b6bd31',
              borderWidth: 0.5,
              borderColor: '#fff',
              padding: normalize(4),
              marginTop: normalize(14),
            }}
          >
            {['High', 'Medium', 'Low'].map(level => (
              <TouchableOpacity
                key={level}
                onPress={() =>
                  setSelectedPriority(selectedPriority === level ? null : level)
                }
                style={{
                  flex: 1,
                  backgroundColor:
                    selectedPriority === level
                      ? Colors.moonstone_blue
                      : 'white',
                  marginHorizontal: normalize(2),
                  borderRadius: normalize(14),
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  borderWidth: 0.5,
                  borderColor: '#ddd',
                }}
              >
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontFamily: Fonts.Poppins_Medium,
                    color: selectedPriority === level ? Colors.white : '#333',
                  }}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Loading Animation */}
          {showLoader ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: normalize(40),
              }}
            >
              <ActivityIndicator size="large" color={Colors.moonstone_blue} />
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  color: Colors.dark_grey,
                  marginTop: normalize(8),
                }}
              >
                {refreshing ? 'Refreshing tasks...' : 'Loading tasks...'}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                backgroundColor: '#fff',
                alignSelf: 'center',
                marginBottom: normalize(20),
              }}
            >
              <FlatList
                data={filteredTasks}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ padding: normalize(10) }}
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
                  // <TouchableOpacity
                  //   style={{
                  //     backgroundColor: Colors.grey_white,
                  //     padding: normalize(10),
                  //     borderRadius: normalize(6),
                  //     marginBottom: normalize(10),
                  //     shadowColor: Colors.black,
                  //     shadowOpacity: 0.1,
                  //     shadowOffset: { width: 0, height: 2 },
                  //     elevation: 3,
                  //   }}
                  // >
                  //   <Text
                  //     style={{
                  //       fontFamily: Fonts.Poppins_Regular,
                  //       fontSize: normalize(12),
                  //       color: Colors.black,
                  //     }}
                  //   >
                  //     {item.taskTitle || 'Untitled Task'}
                  //   </Text>
                  //   <Text
                  //     style={{
                  //       fontFamily: Fonts.Poppins_Regular,
                  //       fontSize: normalize(10),
                  //       color: Colors.dark_grey,
                  //       marginTop: 4,
                  //     }}
                  //   >
                  //     {item.taskInfo || 'No description'}
                  //   </Text>
                  //   <Text
                  //     style={{
                  //       fontFamily: Fonts.Poppins_Regular,
                  //       fontSize: normalize(10),
                  //       color: Colors.sea_Green,
                  //       marginTop: 2,
                  //     }}
                  //   >
                  //     Priority: {item.priority}
                  //   </Text>
                  // </TouchableOpacity>
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

                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Regular,
                        fontSize: normalize(10),
                        color: Colors.sea_Green,
                        marginTop: 2,
                      }}
                    >
                      Priority: {item.priority}
                    </Text>

                    {/* --- Buttons Row --- */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: normalize(10),
                      }}
                    >
                      {/* Edit Button */}
                      <TouchableOpacity
                        onPress={() => handleEditTask(item)}
                        style={{
                          backgroundColor: Colors.moonstone_blue,
                          flex: 0.48,
                          paddingVertical: normalize(8),
                          borderRadius: normalize(6),
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Fonts.Poppins_Medium,
                            color: Colors.white,
                            fontSize: normalize(11),
                          }}
                        >
                          Edit Task
                        </Text>
                      </TouchableOpacity>

                      {/* Mark Complete Button */}
                      {/* <TouchableOpacity
                        onPress={() => handleMarkComplete(item)}
                        style={{
                          backgroundColor: Colors.sea_Green,
                          flex: 0.48,
                          paddingVertical: normalize(8),
                          borderRadius: normalize(6),
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Fonts.Poppins_Medium,
                            color: Colors.white,
                            fontSize: normalize(11),
                          }}
                        >
                          Mark Completed
                        </Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity
                        disabled={item.status === 'completed'}
                        onPress={() => handleMarkComplete(item)}
                        style={{
                          backgroundColor:
                            item.status === 'completed'
                              ? '#ccc'
                              : Colors.sea_Green,
                          flex: 0.48,
                          paddingVertical: normalize(8),
                          borderRadius: normalize(6),
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Fonts.Poppins_Medium,
                            color: Colors.white,
                            fontSize: normalize(11),
                          }}
                        >
                          {item.status === 'completed'
                            ? 'Completed'
                            : 'Mark Completed'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add Task Modal */}
      <ModalTask
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
      />
    </View>
  );
};

export default Home;
