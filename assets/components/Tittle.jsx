import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Tittle = props => {
    const styles = StyleSheet.create({
        tittle:{
            display: 'flex',
            width: '100%',
            backgroundColor: props.palette.primary,
            alignItems: 'center'
        },
        tittletext:{
            fontSize: 38,
            fontFamily: 'Inter-Bold',
            color: props.palette.font,
        }
    });

    return(
        <View style={styles.tittle}>
            <Text style={styles.tittletext}>{props.text}</Text>
        </View>
    );
}

export default Tittle;