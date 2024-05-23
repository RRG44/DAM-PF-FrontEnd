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
      height:'100%',
    },
    title: {
      fontSize: 24,
      width: '80%',
      height:40,
      alignSelf: 'center',
    },
    content: {
      width: '85%',
      height:'100%',
      alignSelf: 'center',
      flexGrow:1,
      bottom:10,
    },
    alltext: {
      top:15,
      alignSelf: 'center',
      textAlign: 'justify',
      color: palette.secondary,
      lineHeight: 24,
      marginBottom:30,
    },
  });

  return (
    <View style={styles.container}>
      <Title palette={palette} style={styles.title}  text="Academy"/>
      <View style={styles.content}>
      <Subtitle palette={palette} text={topic.title}/>
      <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false}>
      <Text palette={palette} style={styles.alltext}>{topic.content}</Text>
    </ScrollView>
    </View>
    </View>
  );
};

export default Detail;