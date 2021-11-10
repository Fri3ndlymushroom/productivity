import React from 'react'
import { View, Text } from 'react-native'
import g, {p} from "../styles/global"
import NavbarStack from '../components/NavbarStack'

export default function Backups({navigation}) {
    return (
        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={"Backups"}></NavbarStack>
            <Text>Hello</Text>
        </View>
    )
}
