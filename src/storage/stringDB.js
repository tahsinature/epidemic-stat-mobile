import AsyncStorage from '@react-native-community/async-storage';

class StringDB {
  data = {
    bookmarkedCountries: [],
    appSettings: {
      tourCompleted: false,
    },
  };

  read = async () => {
    try {
      const strData = await AsyncStorage.getItem('my-string-db');
      if (!strData) {
        await this.write();
      } else {
        const data = JSON.parse(strData);
        this.data = data;
      }
    } catch (error) {
      throw new Error('Failed to string db data from Async Storage');
    }
  };

  write = async () => {
    try {
      await AsyncStorage.setItem('my-string-db', JSON.stringify(this.data));
    } catch (error) {
      throw new Error('Failed to string db data from Async Storage');
    }
  };
}

export default new StringDB();
