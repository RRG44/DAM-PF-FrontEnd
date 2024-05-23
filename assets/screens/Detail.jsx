import React from 'react';
import { StyleSheet, Text, View, useColorScheme,ScrollView } from 'react-native';
import { lightColors, darkColors } from './colors/colorsPalettes.jsx';
import { Subtitle, Title} from '../components/index.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';

const Detail = ({ route, navigation }) => {
  const { topic } = route.params;
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: palette.primary,
      width: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: palette.text,
      width: '85%',
      height:40,
      alignSelf: 'center',
    },
    content: {
      width: '85%',
      alignSelf: 'center',
      flexGrow:1,
    },
    alltext: {
      width: '100%',
      alignSelf: 'center',
      top: 20,
      textAlign: 'justify',
      lineHeight: 24,
    },
  });

  return (
    <View style={styles.container}>
      <Title palette={palette} text="Academy"/>
      <Text style={styles.title}>{topic.title}</Text>
      <View style={styles.content}>
      <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false}>
      <Text style={styles.alltext}>{topic.content}</Text>
    </ScrollView>
    </View>
    </View>
  );
};

export default Detail;