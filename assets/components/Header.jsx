import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = props => {
    const styles = StyleSheet.create({
        header:{
            display: 'flex',
            width: '100%',
            height: 80,
            backgroundColor: props.palette.primary,
            justifyContent: 'center',
        },
        headerlogo:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        Slogo:{
            resizeMode: 'contain',
            height: 40,
            width: 40,
        },
        Slogotext:{
            fontSize: 30,
            fontFamily: 'Inter-Bold',
            color: props.palette.font,
        }
    });

    return(
        <View style={styles.header}>
            <View style={styles.headerlogo}>
                <Image source={require('../images/Slogo.png')} style={styles.Slogo}/>
                <Text style={styles.Slogotext}>secure surf</Text>
            </View>
        </View>
    );
}

export default Header;