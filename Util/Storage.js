import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveNotes = async (notes) => {
  try {
    if (!Array.isArray(notes)) {
      throw new Error('Invalid notes: must be an array');
    }
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
    console.log('Notes saved:', notes); // Thêm console log để kiểm tra
  } catch (e) {
    console.error('Failed to save notes:', e);
  }
};

export const loadNotes = async () => {
  try {
    const notes = await AsyncStorage.getItem('notes');
    console.log('Loaded notes:', notes); // Thêm console log để kiểm tra
    return notes ? JSON.parse(notes) : [];
  } catch (e) {
    console.error('Failed to load notes:', e);
    return [];
  }
};