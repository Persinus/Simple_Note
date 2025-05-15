import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Src/Screens/HomeScreen';
import NoteScreen from './Src/Screens/NoteScreen';

const Stack = createNativeStackNavigator();

// Cấu hình xử lý thông báo
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    const configureNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to send notifications is required!');
        return;
      }

      // Lấy push token để gửi thông báo đến thiết bị này (có thể dùng sau)
      const token = await Notifications.getExpoPushTokenAsync();
      console.log('Push notification token:', token.data);

      // Gửi một thông báo mẫu
      sendTestNotification();
    };
    configureNotifications();
  }, []);

  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Chào mừng đến với ứng dụng của tôi!",
        body: "Đây là một thông báo thử nghiệm từ Expo.",
      },
      trigger: {
        seconds: 2, // Gửi sau 2 giây
      },
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Note" component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});