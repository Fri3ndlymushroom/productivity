import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import g, { p, shadow } from "../styles/global"
import Purchases from 'react-native-purchases'


export default function Pro({ screenProps }) {


    const [packages, setPackages] = useState([])
    const [isPurchasing, setIsPurchasing] = useState(false)

    useEffect(() => {
        const getPackages = async () => {
            try {
                const offerings = await Purchases.getOfferings();
                if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
                    setPackages(offerings.current.availablePackages)
                }
            } catch (e) {
                console.error(e)
            }
        }

        getPackages()
    }, [])



    const purchase = async (product) => {
        try {
            const { purchaserInfo } = await Purchases.purchasePackage(product)

            if (typeof purchaserInfo.entitlements.active["pro"] !== 'undefined') {
                console.log("user is Pro")
                screenProps.setIsPro(true)
            }
        } catch (e) {
            console.log(e)
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
        <View style={{ width: 300 }}>
            {
                packages.map((product, i) => {
                    return (
                        <TouchableOpacity
                            key={product.identifier}
                            style={{
                                width: "100%",
                                height: 140,
                            }}
                            onPress={() => purchase(product)}
                        >
                            <View style={{
                                backgroundColor: p.bg2,
                                borderRadius: p.br,
                                marginVertical: 10,
                                padding: 15,
                                paddingBottom: 50,
                                ...shadow,
                                height: 100
                            }}>
                                <Text style={{ color: p.text__main, fontSize: 18 }}>{/*product.product.title*/"Theta Pro (Subscription)"}</Text>
                                <Text style={{ marginHorizontal: 10, marginTop: 10, color: p.text__dim }}>{product.product.description}</Text>
                                <TouchableOpacity onPress={() => restorePurchases} style={{ position: "absolute", top: 80, right: 12 }}><Text style={[g.text, { fontSize: 11, color: p.text__dim }]}>Restore purchses</Text></TouchableOpacity>
                            </View>
                            <View style={{
                                backgroundColor: p.hl,
                                width: "35%",
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                borderRadius: 20,
                                position: "absolute",
                                left: "30%",
                                top: 90,
                                ...shadow
                            }}>
                                <Text style={{ textAlign: "center", fontSize: 18 }}>{product.product.price_string}</Text>
                            </View>

                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}



