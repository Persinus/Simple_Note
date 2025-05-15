import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NoteCard = ({ note, onPress, onDelete }) => {
  // Màu nền ngẫu nhiên cho thẻ
  const colors = ['#FFEBEE', '#E3F2FD', '#FFF3E0', '#F3E5F5', '#E8F5E9'];
  const randomColor = colors[parseInt(note.id, 10) % colors.length];

  return (
    <View style={[styles.card, { backgroundColor: randomColor }]}>
      <TouchableOpacity style={styles.content} onPress={onPress}>
        <Text style={styles.title}>{note.title || 'Untitled Note'}</Text>
        <Text style={styles.time}>{note.time}</Text>
        <Text style={styles.contentText} numberOfLines={2}>
          {note.content || 'No content available...'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(note.id)} style={styles.deleteButton}>
        <MaterialIcons name="delete" size={24} color="#FF4D4F" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  content: { flex: 1 },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  contentText: { fontSize: 14, color: '#666' },
  deleteButton: {
    marginLeft: 10,
  },
});

export default NoteCard;
