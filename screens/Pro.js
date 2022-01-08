import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native'
import NavbarStack from '../components/NavbarStack'
import { Spacer } from '../components/Components'
import g, { p } from "../styles/global"
import Purchases from 'react-native-purchases'


export default function Pro({ navigation, screenProps }) {


    const [packages, setPackages] = useState([])
    const [isPurchasing, setIsPurchasing] = useState(false)

    useEffect(() => {
        const getPackages = async () => {
            try {
                const offerings = await Purchases.getOfferings();
                if (offerings.current !== null) {
                    setPackages(offerings.current.availablePackages)
                }
            } catch (e) {
                screenProps.setIsPro(true)
                console.error(e)
                navigation.goBack()
            }
        }

        getPackages()
    }, [])



    const purchase = async (product) => {
        try {
            const { purchaserInfo } = await Purchases.purchasePackage(product)

            if (typeof purchaserInfo.entitlements.active["pro"] !== 'undefined') {
                console.log("user is Pro")

            }
        } catch (e) {
            console.error(e)
        }
    }

    const restorePurchases = async () => {
        try {
            const restore = await Purchases.restoreTransactions()

            const purchaserInfo = await Purchases.getPurchaserInfo()

            if (typeof purchaserInfo.entitlements.active["pro"] !== "undefined") {
                screenProps.setIsPro(true)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <View style={g.bodyWrapper}>
            <View style={g.body}>
                <NavbarStack navigation={navigation} loc={"Theta Pro"}></NavbarStack>
                <Spacer height={150} />
                <TouchableOpacity onPress={()=>{Linking.openURL("https://moritzhuesser.com/thetaproductivity/terms_and_services").catch(err => console.error("Couldn't load page", err));}}><Text style={g.text}>Terms and services</Text></TouchableOpacity>

                <ScrollView>
                    {
                        packages.map((product) => {
                            <TouchableOpacity onPress={() => purchase(product)}>
                                <Text>{product.title}</Text>
                                <Text>{product.description}</Text>
                                <Text>{product.price_string}</Text>
                            </TouchableOpacity>
                        })
                    }
                </ScrollView>
                <TouchableOpacity onPress={() => restorePurchases} style={g.button}><Text style={g.text}>Restore purchses</Text></TouchableOpacity>
                <Spacer height={50} />
            </View>
        </View>
    )
}
