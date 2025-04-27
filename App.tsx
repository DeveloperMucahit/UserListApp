import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Kullanıcı verilerini çekme fonksiyonu
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Bileşen ilk yüklendiğinde kullanıcı verilerini çek
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          )}
        />
      )}
      <Button title="Yeni Verileri Çek" onPress={fetchUsers} />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  userName: {
    fontSize: 18,
  },
});

export default App;
