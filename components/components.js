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
