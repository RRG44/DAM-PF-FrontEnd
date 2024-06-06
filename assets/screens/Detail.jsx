import React, {useEffect} from 'react';
import { StyleSheet, Text, View, useColorScheme,ScrollView, BackHandler } from 'react-native';
import { lightColors, darkColors } from './colors/colorsPalettes.jsx';
import { Subtitle, Title} from '../components/index.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';

const Detail = ({ route, navigation }) => {
  const { topic } = route.params;
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Academy');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);


  const styles = StyleSheet.create({
    alltext: {
      alignSelf: 'center',
      textAlign: 'justify',
      color: palette.secondary,
      lineHeight: 24,
    },
    backcontainer: {
      display: 'flex',
      flex: 1,
      backgroundColor: palette.primary,
      width: '100%',
    },
    maincontainer: {
      display: 'flex',
      flex: 1,
      backgroundColor: palette.primary,
      width: '90%',
      alignSelf: 'center'
    },
  });

  return (
    <View style={styles.backcontainer}>
      <View style={styles.maincontainer}>
        <Title palette={palette} text="Academy"/>
        <Subtitle palette={palette} text={topic.title}/>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10}}>
          <Text palette={palette} style={styles.alltext}>{topic.content}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Detail;