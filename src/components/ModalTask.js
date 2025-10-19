import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import normalize from '../utils/normalize';
import { Colors, Fonts } from '../themes/Themes';
import DateTimePickerComponent from './DateTimePickerComponent';
import TextInput1 from './TextInput1';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetTaskStatus,
  selectUploadSuccess,
  uploadTasktoDb,
} from '../redux/reducer/TaskReducer';
import showMessage from '../utils/showMessage';

const ModalTask = ({ isVisible = false, onBackdropPress = () => {} }) => {
  const [priority, setPriority] = useState(null); // 'High' | 'Medium' | 'Low'
  const [taskTitle, setTaskTitle] = useState('');
  const [taskInfo, setTaskInfo] = useState('');
  const [dateTime, setDateTime] = useState(null);
  const IsSuccess = useSelector(selectUploadSuccess);
  const dispatch = useDispatch();
  

  useEffect(() => {
    if (IsSuccess) {
      showMessage('Task has been added to the list ');
      onBackdropPress();
      dispatch(resetTaskStatus());
    }
  }, [IsSuccess]);

  const handleAddTask = () => {
    if (!taskTitle.trim() || !taskInfo.trim() || !priority || !dateTime) {
      Alert.alert(
        'Validation Error',
        'Please fill all fields and select a date & time.',
      );
      return;
    }

    // If valid, proceed with the task submission logic
    console.log('Task Added:', { taskTitle, taskInfo, priority, dateTime });
    const data = {
      taskTitle: taskTitle,
      taskInfo: taskInfo,
      dateTime: dateTime,
      priority: priority,
      status: 'pending',
    };
    dispatch(uploadTasktoDb(data));
  };

  useEffect(() => {
    console.log('priority is ::' + priority);
  }, [priority]);

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.5}
      animationIn={'zoomIn'}
      animationOut={'slideOutDown'}
      animationInTiming={700}
      animationOutTiming={800}
      onBackButtonPress={onBackdropPress}
      onBackdropPress={onBackdropPress}
      style={{
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        margin: 0,
        padding: 0,
      }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '90%',
              height: normalize(380),
              backgroundColor: Colors.grey_white,
              marginTop: normalize(190),
              alignSelf: 'center',
              borderRadius: normalize(15),
              paddingHorizontal: normalize(15),
              paddingVertical: normalize(30),
            }}
          >
            <TextInput1
              width={'100%'}
              placeholder={'Task Title'}
              marginV={normalize(4)}
              value={taskTitle}
              onChangeText={e => {
                setTaskTitle(e);
              }}
            />
            <TextInput1
              width={'100%'}
              placeholder={'Task Description (optional)'}
              marginV={normalize(4)}
              value={taskInfo}
              onChangeText={e => {
                setTaskInfo(e);
              }}
            />
            <DateTimePickerComponent
              dateTime={dateTime}
              setDateTime={setDateTime}
            />

            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: Colors.black,
                alignSelf: 'center',
                marginVertical: normalize(12),
                marginTop: normalize(40),
              }}
            />
            <View
              style={{
                height: normalize(20),
                width: normalize(95),
                alignSelf: 'center',
                backgroundColor: Colors.grey_white,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: normalize(120),
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: normalize(12),
                  color: Colors.black,
                }}
              >
                Select Priority
              </Text>
            </View>

            <View
              style={{
                height: normalize(35),
                width: '100%',
                flexDirection: 'row',
                alignSelf: 'center',
              }}
            >
              {['High', 'Medium', 'Low'].map(level => {
                const backgroundColors = {
                  High: 'red',
                  Medium: 'orange',
                  Low: 'lightgreen',
                };
                const isSelected = priority === level;

                return (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setPriority(level)}
                    style={{
                      flex: 1,
                      backgroundColor: backgroundColors[level],
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: isSelected ? 0.6 : 1,
                      borderTopLeftRadius: level === 'High' ? normalize(14) : 0,
                      borderBottomLeftRadius:
                        level === 'High' ? normalize(14) : 0,
                      borderTopRightRadius: level === 'Low' ? normalize(14) : 0,
                      borderBottomRightRadius:
                        level === 'Low' ? normalize(14) : 0,
                      borderLeftWidth: level === 'Medium' ? 3 : 0,
                      borderRightWidth: level === 'Medium' ? 3 : 0,
                      borderColor: 'white',
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.grey_white,
                        fontFamily: Fonts.Poppins_Regular,
                      }}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              onPress={handleAddTask}
              style={{
                width: '100%',
                height: normalize(40),
                backgroundColor: Colors.half_baked,
                marginTop: normalize(25),
                shadowColor: 'black',
                borderRadius: normalize(7),
                elevation: normalize(6),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: normalize(13),
                }}
              >
                Add Task
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalTask;
