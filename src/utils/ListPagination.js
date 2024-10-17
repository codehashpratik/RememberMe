import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors, Fonts} from '../../themes/ThemePath';
import normalize from '../../utils/helper/normalize';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {notificationListRequest} from '../../redux/reducer/ProfileReducer';
import connectionrequest from '../../utils/helper/NetInfo';
import {merge} from '../../utils/helper/helper';
import _ from 'lodash';
let status = '';

export default function Notification(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [callingListApi, setCallingListApi] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setData([]);
      setPage(1);
      notificationList(1);
    }
  }, [isFocused]);

  const merge = (first, second) => {
    for (let i = 0; i < second.length; i++) {
      first.push(second[i]);
    }
    return first;
  };

  const notificationList = page => {
    let obj = {
      page: page,
      perpage: 10,
    };
    connectionrequest()
      .then(() => {
        dispatch(notificationListRequest(obj));
      })
      .catch(err => {
        // console.log(err);
        showErrorAlert('Please connect to Internet');
      });
  };

  function ListFooterComponent() {
    return (
      <>
        {ProfileReducer?.status == 'Profile/notificationListRequest' ? (
          <View
            style={{
              width: normalize(40),
              alignSelf: 'center',
            }}>
            <ActivityIndicator
              size={'small'}
              color={Colors.primaryColor}
              style={{
                marginTop: normalize(5),
              }}
            />
          </View>
        ) : null}
      </>
    );
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 50;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/notificationListRequest':
        status = ProfileReducer.status;
        setCallingListApi(true);
        break;
      case 'Profile/notificationListSuccess':
        status = ProfileReducer.status;
        setCallingListApi(false);

        let _data = ProfileReducer?.notificationListResponse?.data;

        if (!_.isEmpty(_data) && page !== 1) {
          let arr1 = [...data];
          let arr = merge(arr1, _data);
          setData(arr);
        } else if (page == 1) {
          setData(_data);
        } else {
          setCallingListApi(true);
        }

        break;
      case 'Profile/notificationListFailure':
        status = ProfileReducer.status;
        setCallingListApi(true);
        break;
    }
  }

  return (
    <FlatList
      style={{
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}
      // nestedScrollEnabled={true}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              height: 100,
              backgroundColor: 'green',
              marginVertical: 5,
            }}></View>
        );
      }}
      contentContainerStyle={{
        paddingBottom: normalize(60),
      }}
      ListEmptyComponent={() => {
        return <Text>No Notification Yet</Text>;
      }}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          if (callingListApi == false) {
            notificationList(page + 1);
            setPage(page + 1);
          }
        }
      }}
      scrollEventThrottle={16}
      ListFooterComponent={ListFooterComponent}
    />
  );
}
