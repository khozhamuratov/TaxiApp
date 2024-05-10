import React, {useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {selected, selectedDriver} from '../../features/users/usersSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {lightTheme} from '../../styles';
import {driverStyles} from './Driver/styles';

const Line = () => {
  const {listDrivers} = useAppSelector(select => select.listUsers);
  const refRBSheet: React.MutableRefObject<any> = useRef();
  const {themeColor} = useAppSelector(select => select.themeColor);
  const {Driver} = useAppSelector(select => select.selectedDriver);
  const date = new Date(Driver.joined_at);
  const {profileData} = useAppSelector(select => select.profileData);

  const dispatch = useAppDispatch();

  return (
    <>
      <View>
        {listDrivers.length > 0 ? (
          listDrivers.map((user, index) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(selectedDriver(user.id));
                dispatch(selected());
                refRBSheet.current.open();
              }}
              key={user.id}
              style={[
                driverStyles.driversTableRow,
                user.car_number === profileData.username
                  ? themeColor !== 'light'
                    ? driverStyles.active
                    : {backgroundColor: '#f1f1f1'}
                  : null,
              ]}>
              <View style={driverStyles.driverInfo}>
                <Text style={driverStyles.span}>{index + 1}</Text>
                <View style={driverStyles.userName}>
                  <Text
                    style={[
                      driverStyles.userTxt,
                      themeColor === 'light' && lightTheme.lightText,
                    ]}>
                    {user.first_name}
                  </Text>
                  <Text
                    style={[
                      driverStyles.userTxt,
                      themeColor === 'light' && lightTheme.lightText,
                    ]}>
                    {user.last_name}
                  </Text>
                  <Text style={driverStyles.userCarTxt}>{user.car_number}</Text>
                </View>
              </View>
              <Text
                style={[
                  driverStyles.userCarTxt,
                  {fontWeight: '400', color: 'gray'},
                ]}>
                {user.passengers} / 4
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 700,
            }}>
            <Text style={{color: 'gray', fontSize: 16, fontWeight: '600'}}>
              Список пуст
            </Text>
          </View>
        )}
        <RBSheet
          ref={refRBSheet}
          useNativeDriver={false}
          height={170}
          closeOnPressBack={true}
          dragOnContent={false}
          draggable={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: themeColor === 'light' ? 'black' : '#FFF',
            },
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: themeColor === 'light' ? '#fff' : '#212121',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            },
          }}
          customModalProps={{
            animationType: 'fade',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}>
          <View style={driverStyles.driverWrapper}>
            <Text
              style={[
                driverStyles.h1,
                themeColor === 'light' && {color: 'black'},
              ]}>
              {Driver.first_name} {Driver.last_name}
            </Text>
            <Text style={driverStyles.span}>
              Гос.номер: {Driver.car_number}
            </Text>
            <Text style={driverStyles.span}>
              Присоединился в: {date.toLocaleDateString()}{' '}
              {date.toLocaleTimeString()}
            </Text>
            <Text style={driverStyles.span}>
              Всего пассажиров: {Driver.passengers}/4
            </Text>
          </View>
        </RBSheet>
      </View>
    </>
  );
};

export default Line;
