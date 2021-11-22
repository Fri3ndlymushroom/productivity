import React from 'react';
import { Text, View } from 'react-native';
import gs from '../styles/global'






export const DefaultText =(props) => {

    return (
        <Text style={gs.text}>
            {props.children}
        </Text>
    );
}


export const Spacer =({height}) => {

    let style = {
        height: height,
        width: "100%"
    }

    return (
        <View style={style}>

        </View>
    );
}