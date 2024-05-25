import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert, View, SafeAreaView, BackHandler, useColorScheme } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { btoa } from 'react-native-quick-base64';
import { ResultsContainer, Button, Title, Subtitle} from '../components/index.jsx';
import { lightColors, darkColors } from './colors/colorsPalettes.jsx';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import server from '../components/server.js';

export default function App({route, navigation}){
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;

  const [urlInfo, setUrlInfo] = useState('');

  const goBack = () => {
    setUrlInfo('');
    navigation.navigate('Scan Url');
  };

  const OpenUrlButton = ( ) => {
    const {url} = route.params;
    if (url) {
      Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
    } else {
      console.error("No URL provided");
    }
  };

  useFocusEffect( React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress', () => {
          navigation.navigate('Scan Url');
          return true;
        }
      );

      return () => subscription.remove();
    }, [navigation])
  );

  useEffect( () => {

    const {url} = route.params
    const urlB64 = customBase64Encode(url);

    function customBase64Encode(str) {
      let base64Encoded = btoa(str);
      base64Encoded = base64Encoded.replace(/=+$/, '');
      return base64Encoded;
    }
  
    function formatResponse(data){
      if (data.hasOwnProperty('error')){
        return `${data.error.code}:\n${data.error.message}`
      }
  
      if (data.hasOwnProperty('data')){

        // Extracting relevant data
        const id = data.data.id;
        const url = data.data.attributes.url;
        const title = data.data.attributes.title;
        const reputation = data.data.attributes.reputation;
        const categories = data.data.attributes.categories;
        const tags = data.data.attributes.tags;
        const analysisStats = data.data.attributes.last_analysis_stats;
        const totalVotes = data.data.attributes.total_votes;

        // Formatting the text
        const formattedText = `URL ID: ${id}
        \nURL: ${url}
        \nTitle: ${title}
        \nReputation: ${reputation}
        \nCategories: ${Object.values(categories).join(", ")}
        \nTags: ${tags.join(", ")}
        \nAnalysis Stats:
          - Malicious: ${analysisStats.malicious}
          - Suspicious: ${analysisStats.suspicious}
          - Undetected: ${analysisStats.undetected}
          - Harmless: ${analysisStats.harmless}
          - Timeout: ${analysisStats.timeout}
        \nTotal Votes:
          - Harmless: ${totalVotes.harmless}
          - Malicious: ${totalVotes.malicious}`;

        return formattedText
      }
    }

    const fetchURL = async () => {
      setUrlInfo('');
      try{
        const response = await fetch(`${server}/scan_url_test/${urlB64}`);
        const data = await response.json();
        setUrlInfo(formatResponse(data));
      }
      catch (e) {
        console.error(e);
        setUrlInfo(formatResponse({
          error: {
            code: 'AppError',
            message: e
          }
        }));
      }
    };

    fetchURL();

  }, [route.params] );

  const styles = StyleSheet.create({
    safeArea:{
      display: 'flex',
      flex: 1,
      backgroundColor: palette.primary,
      width: '100%',
    },
    mainContainer:{
      width: '85%',
      alignSelf: 'center',
    }
  });

  return (
    <View style = {styles.safeArea}>
      <View style = {styles.mainContainer}>
        <Title text = "Scan URL" palette = {palette}/>
        <Subtitle text = "Results:" palette = {palette}/>
        <ResultsContainer text = {urlInfo !== '' ? urlInfo: ''} palette={palette}/>
        <Button text = "Go Back" onPress = {goBack} palette={palette} marginBottom={20} color={palette.darkblue}/>
        <Button text = "Visit Site Under My Risk" palette={palette} color={palette.orange} onPress={OpenUrlButton}/>
      </View>
    </View>
  );
};
