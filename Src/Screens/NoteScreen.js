import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { loadNotes, saveNotes } from '../../Util/Storage';
import * as Notifications from 'expo-notifications';  // Import expo-notifications

const NoteScreen = ({ route, navigation }) => {
  const { note } = route.params;
  const [title, setTitle] = useState(note.title || ''); // Thêm state cho tiêu đề
  const [content, setContent] = useState(note.content || ''); // Thêm state cho nội dung

  const saveContent = async () => {
    const notes = await loadNotes();
    const updatedNotes = notes.map((n) =>
      n.id === note.id ? { ...n, title, content } : n // Cập nhật cả title và content
    );
    await saveNotes(updatedNotes);

    // Gửi thông báo push sau khi lưu ghi chú
    sendNotification();

    navigation.goBack();
  };

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Ghi chú đã được lưu!",
        body: `Tiêu đề: ${title} đã được lưu thành công!`,
      },
      trigger: {
        seconds: 1, // Gửi ngay sau 1 giây
      },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title..."
      />
      <TextInput
        style={[styles.input, { flex: 2 }]} // Tăng chiều cao cho content input
        value={content}
        onChangeText={setContent}
        multiline
        placeholder="Write your note here..."
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveContent}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#CCFFFF',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 15,
    textAlignVertical: 'top',
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default NoteScreen;