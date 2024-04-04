import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Subtittle = props => {
    const styles = StyleSheet.create({
        subtittle:{
            display: 'flex',
            width: '100%',
            backgroundColor: props.palette.primary,
            marginBottom:25,
        },
        tittletext:{
            fontSize: 21,
            fontFamily: 'Inter-Bold',
            color: props.palette.font,
        }
    });

    return(
        <View style={styles.subtittle}>
            <Text style={styles.tittletext}>{props.text}</Text>
        </View>
    );
}

export default Subtittle;