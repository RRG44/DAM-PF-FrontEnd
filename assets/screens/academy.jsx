import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, FlatList, Alert, View, SafeAreaView, BackHandler,  useColorScheme, ScrollView} from 'react-native';

import { lightColors, darkColors } from './colors/colorsPalettes.jsx';
import { Subtitle, Title} from '../components/index.jsx';

export default function App({navigation}){

  const data = [
    { id: '1', title: 'Datos EXIF', 
    content: 'El crecimiento mundial y alta disponibilidad a la que nos enfrentamos actualmente \n'
            +'Holan\n'+'hola'},




    { id: '2', title: 'Cookies y Rastreadores', content: 'Content for Title 2' },
    { id: '3', title: 'Malware y tipos de malware', content: 'Content for Title 2' },
    { id: '4', title: 'OSINT', content: 'Content for Title 2' },
    { id: '5', title: 'Ingeniería social', content: 'Content for Title 2' },
    { id: '6', title: 'FastAPI', content: 'Content for Title 2' },
    { id: '7', title: 'Title 2', content: 'Content for Title 2' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}
      onPress={() => navigation.navigate('Detail', { title: item.title, content: item.content })}>
      <Text style={{ color: palette.text }}>- {item.title}</Text>
    </TouchableOpacity>
  );

  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: palette.primary,
      width: '100%',
    },
    content: {
      width: '85%',
      alignSelf: 'center',
    },
    item: {
      padding: 10,
      marginVertical: 8,
      backgroundColor: palette.primary,
      font: palette.primary,
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content} showsVerticalScrollIndicator={false}>
        <Title palette={palette} text="Academy"/>
        <Subtitle palette={palette} text="Index: "/>
        <View>
          <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id}/>
        </View>
      </SafeAreaView>
    </View>
  );
};

