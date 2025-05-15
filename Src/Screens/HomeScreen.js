import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Alert, Text, Animated } from 'react-native';
import { loadNotes, saveNotes } from '../../Util/Storage';
import NoteCard from '../../Component/NoteCard';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0)); // Để tạo hiệu ứng fade-in khi hiển thị

  useEffect(() => {
    const fetchNotes = async () => {
      const loadedNotes = await loadNotes();
      setNotes(loadedNotes);
    };
    fetchNotes();

    const focusListener = navigation.addListener('focus', fetchNotes);
    
    return () => {
      focusListener();
    };
  }, [navigation]);

  useEffect(() => {
    // Áp dụng hiệu ứng fade-in khi có dữ liệu
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [notes]);

  const addNote = async () => {
    const newNote = {
      id: Date.now().toString(),
      title: '',
      content: '',
      titleStyle: { bold: false, italic: false, underline: false }, // Default title style
      time: new Date().toLocaleString(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    await saveNotes(updatedNotes);
  
    navigation.navigate('Note', { note: newNote });
  };

  const deleteNote = async (id) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updatedNotes = notes.filter((note) => note.id !== id);
          setNotes(updatedNotes);
          await saveNotes(updatedNotes);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {notes.length === 0 ? (
        <View style={styles.noNotesContainer}>
          <Text style={styles.noNotesText}>Bạn chưa có ghi chú nào</Text>
        </View>
      ) : (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NoteCard
                note={item}
                onPress={() => navigation.navigate('Note', { note: item })}
                onDelete={deleteNote}
              />
            )}
            contentContainerStyle={styles.listContainer}
          />
        </Animated.View>
      )}
      <TouchableOpacity style={styles.fab} onPress={addNote}>
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#CCFFFF',
  },
  listContainer: {
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  noNotesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotesText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
  },
});

export default HomeScreen;