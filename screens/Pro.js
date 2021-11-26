import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import NavbarStack from '../components/NavbarStack'
import { Spacer } from '../components/Components'
import g, { p } from "../styles/global"
import Purchases from 'react-native-purchases'

export default function Pro({ navigation }) {


    const [packages, setPackages] = useState([])
    const [isPurchasing, setIsPurchasing] = useState(false)

    useEffect(() => {
        const getPackages = async () => {
            try {
                const offerings = await Purchases.getOfferings();
                if (offerings.current !== null) {
                    console.log(offerings.current)
                }
            } catch (e) {
                console.error(e)
            }
        }

        getPackages()
    }, [])






    return (
        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={"Theta Pro"}></NavbarStack>
            <Spacer height={150} />
            <Text style={g.text}>Terms and services</Text>
        </View>
    )
}
