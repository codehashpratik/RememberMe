// // import React, {useState} from 'react';
// // import {View, Text, Button, Platform} from 'react-native';
// // import DateTimePicker from '@react-native-community/datetimepicker';

// // const DateTimePickerComponent = () => {
// //   const [date, setDate] = useState(new Date());
// //   const [mode, setMode] = useState('date'); // 'date' or 'time'
// //   const [show, setShow] = useState(false);

// //   const onChange = (event, selectedDate) => {
// //     setShow(false);
// //     if (selectedDate) {
// //       setDate(selectedDate);
// //     }
// //   };

// //   const showMode = currentMode => {
// //     setShow(true);
// //     setMode(currentMode);
// //   };

// //   const formatAMPM = date => {
// //     let hours = date.getHours();
// //     let minutes = date.getMinutes();
// //     const ampm = hours >= 12 ? 'PM' : 'AM';
// //     hours = hours % 12;
// //     hours = hours ? hours : 12; // hour '0' should be '12'
// //     minutes = minutes < 10 ? '0' + minutes : minutes;
// //     return hours + ':' + minutes + ' ' + ampm;
// //   };

// //   return (
// //     <View style={{padding: 20}}>
// //       {/* <Text style={{fontSize: 16, marginBottom: 10}}>
// //         Selected Date: {date.toDateString()}
// //       </Text>
// //       <Text style={{fontSize: 16, marginBottom: 10}}>
// //         Selected Time: {formatAMPM(date)}
// //       </Text> */}

// //       <Button onPress={() => showMode('date')} title="Select Date" />
// //       <View style={{height: 10}} />
// //       <Button onPress={() => showMode('time')} title="Select Time" />

// //       {show && (
// //         <DateTimePicker
// //           value={date}
// //           mode={mode}
// //           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// //           is24Hour={false}
// //           onChange={onChange}
// //         />
// //       )}
// //     </View>
// //   );
// // };

// // export default DateTimePickerComponent;
// import React, {useState} from 'react';
// import {View, Text, Platform, TouchableOpacity} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import normalize from '../utils/normalize';
// import {Colors, Fonts} from '../themes/Themes';

// const DateTimePickerComponent = () => {
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);

//   const onChange = (event, selectedDate) => {
//     setShow(false);
//     if (selectedDate) {
//       setDate(selectedDate);
//     }
//   };

//   const showPicker = currentMode => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const formatDate = date => {
//     return date.toDateString();
//   };

//   const formatTime = date => {
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12 || 12;
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     return `${hours}:${minutes} ${ampm}`;
//   };

//   return (
//     <View style={{marginTop: normalize(20), width: '100%'}}>
//       <Text
//         style={{
//           fontFamily: Fonts.Poppins_Regular,
//           fontSize: normalize(13),
//           color: Colors.black,
//           marginBottom: normalize(10),
//         }}>
//         Selected: {formatDate(date)} at {formatTime(date)}
//       </Text>

//       <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//         <TouchableOpacity
//           onPress={() => showPicker('date')}
//           style={{
//             flex: 1,
//             backgroundColor: Colors.powder_blue,
//             paddingVertical: normalize(10),
//             borderRadius: normalize(10),
//             alignItems: 'center',
//             marginRight: normalize(5),
//           }}>
//           <Text
//             style={{
//               fontFamily: Fonts.Poppins_Regular,
//               color: Colors.grey_white,
//             }}>
//             Select Date
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => showPicker('time')}
//           style={{
//             flex: 1,
//             backgroundColor: Colors.powder_blue,
//             paddingVertical: normalize(10),
//             borderRadius: normalize(10),
//             alignItems: 'center',
//             marginLeft: normalize(5),
//           }}>
//           <Text
//             style={{
//               fontFamily: Fonts.Poppins_Regular,
//               color: Colors.grey_white,
//             }}>
//             Select Time
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {show && (
//         <DateTimePicker
//           value={date}
//           mode={mode}
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           is24Hour={false}
//           onChange={onChange}
//         />
//       )}
//     </View>
//   );
// };

// export default DateTimePickerComponent;
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import normalize from '../utils/normalize';
import {Colors, Fonts} from '../themes/Themes';

const DateTimePickerComponent = ({dateTime, setDateTime}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={{marginTop: normalize(5), width: '100%'}}>
      <Text
        style={{
          fontFamily: Fonts.Poppins_Regular,
          fontSize: normalize(10),
          color: Colors.black,
          marginBottom: normalize(10),
          letterSpacing: normalize(2),
          textAlign: 'center',
        }}>
        {date.toDateString()} at{' '}
        {date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
      </Text>

      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          borderWidth: 1,
          marginTop: normalize(6),
          paddingVertical: normalize(10),
          borderRadius: normalize(10),
          alignItems: 'center',
          width: '100%',
          borderColor: 'grey',
        }}>
        <Text
          style={{
            fontFamily: Fonts.Poppins_Regular,
            color: Colors.black,
            fontSize: normalize(12),
          }}>
          Select Date & Time
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        mode="datetime"
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate);
          setDateTime(selectedDate);
        }}
        onCancel={() => setOpen(false)}
        textColor={Colors.black}
        theme="light"
        locale="en"
        fadeToColor="none"
      />
    </View>
  );
};

export default DateTimePickerComponent;
