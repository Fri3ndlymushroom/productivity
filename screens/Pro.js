import React from 'react'
import { View, Text } from 'react-native'
import NavbarStack from '../components/NavbarStack'
import { Spacer } from '../components/Components'
import g,{p} from "../styles/global"

export default function Pro({navigation}) {
    return (
        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={"Theta Pro"}></NavbarStack>
            <Spacer height={150}/>
            <Text style={g.text}>hello world</Text>
        </View>
    )
}
