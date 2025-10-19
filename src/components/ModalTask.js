import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import normalize from '../utils/normalize';
import { Colors, Fonts } from '../themes/Themes';
import DateTimePickerComponent from './DateTimePickerComponent';
import TextInput1 from './TextInput1';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  resetTaskStatus,
  selectUploadSuccess,
  uploadTasktoDb,
} from '../redux/reducer/TaskReducer';
import showMessage from '../utils/showMessage';

const ModalTask = ({
  isVisible = false,
  onBackdropPress = () => {},
  editingTask = null,
  setEditingTask, // <-- parent can reset editingTask
}) => {
  const [priority, setPriority] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskInfo, setTaskInfo] = useState('');
  const [dateTime, setDateTime] = useState(null);
  const IsSuccess = useSelector(selectUploadSuccess);
  const dispatch = useDispatch();

  // Prefill modal when editing
  useEffect(() => {
    if (editingTask) {
      setTaskTitle(editingTask.taskTitle || '');
      setTaskInfo(editingTask.taskInfo || '');
      setPriority(editingTask.priority || null);
      setDateTime(editingTask.dateTime ? editingTask.dateTime.toDate() : null);
    } else {
      setTaskTitle('');
      setTaskInfo('');
      setPriority(null);
      setDateTime(null);
    }
  }, [editingTask]);

  // Reset modal on success
  useEffect(() => {
    if (IsSuccess) {
      showMessage(
        editingTask ? 'Task updated successfully!' : 'Task added successfully!',
      );
      handleClose();
      dispatch(resetTaskStatus());
    }
  }, [IsSuccess]);

  const handleClose = () => {
    onBackdropPress();
    if (setEditingTask) setEditingTask(null); // reset parent editingTask
  };

  const handleAddOrEditTask = async () => {
    if (!taskTitle.trim() || !priority || !dateTime) {
      // Only mandatory fields are taskTitle, priority, dateTime
      Alert.alert(
        'Validation Error',
        'Please fill Task Title, Priority and Date/Time.',
      );
      return;
    }

    const data = {
      taskTitle,
      priority,
      dateTime,
    };

    // Only include optional fields if user changed them
    if (taskInfo.trim()) data.taskInfo = taskInfo;

    if (editingTask?.id) {
      // UPDATE existing task
      try {
        const currentUser = auth().currentUser;
        if (!currentUser) throw new Error('User not authenticated');

        // Merge old data with new, keep unchanged fields
        const updatedData = {
          ...editingTask, // original task data
          ...data, // only changed fields
        };

        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('tasks')
          .doc(editingTask.id)
          .update(updatedData);

        console.log('✅ Task updated:', updatedData);
        handleClose();
      } catch (err) {
        console.error('❌ Error updating task:', err);
        Alert.alert('Error', 'Failed to update task.');
      }
    } else {
      // ADD new task
      dispatch(uploadTasktoDb({ ...data, status: 'pending' }));
    }
  };
  const handleDeleteTask = async () => {
    if (!editingTask?.id) return;

    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const currentUser = auth().currentUser;
            if (!currentUser) throw new Error('User not authenticated');

            await firestore()
              .collection('users')
              .doc(currentUser.uid)
              .collection('tasks')
              .doc(editingTask.id)
              .delete();

            showMessage('Task deleted successfully!');
            handleClose(); // close modal
          } catch (err) {
            console.error('❌ Error deleting task:', err);
            Alert.alert('Error', 'Failed to delete task.');
          }
        },
      },
    ]);
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.6}
      animationIn={'zoomIn'}
      animationOut={'slideOutDown'}
      animationInTiming={700}
      animationOutTiming={800}
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
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
              height: editingTask ? normalize(420) : normalize(380),
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
              onChangeText={setTaskTitle}
            />
            <TextInput1
              width={'100%'}
              placeholder={'Task Description (optional)'}
              marginV={normalize(4)}
              value={taskInfo}
              onChangeText={setTaskInfo}
            />
            <DateTimePickerComponent
              dateTime={dateTime}
              setDateTime={setDateTime}
            />

            {/* Priority Buttons */}
            <View
              style={{
                flexDirection: 'row',
                height: normalize(35),
                marginTop: normalize(40),
              }}
            >
              {['High', 'Medium', 'Low'].map(level => {
                const bgColors = {
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
                      backgroundColor: bgColors[level],
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: isSelected ? 0.6 : 1,
                      borderRadius: normalize(14),
                      marginHorizontal: level === 'Medium' ? normalize(2) : 0,
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
              onPress={handleAddOrEditTask}
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
                {editingTask ? 'Update Task' : 'Add Task'}
              </Text>
            </TouchableOpacity>
            {editingTask?.id && (
              <TouchableOpacity
                onPress={handleDeleteTask}
                style={{
                  width: '100%',
                  height: normalize(40),
                  backgroundColor: 'red',
                  marginTop: normalize(12),
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
                  Delete Task
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalTask;
