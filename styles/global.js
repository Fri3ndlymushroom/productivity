import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



const getStyle = async () => {
    dbSettings = JSON.parse(await AsyncStorage.getItem('@settings'))
    console.log(dbSettings)
    return dbSettings.mode
}



export const p = {
    bg1: "#151724",
    bg2: "#181c2e",

    hl: "#5755D3",

    text__main: "#c9c9c9",
    text__dim: "#383d57",

    br: 10
}

export const iconNames = ["cube", "triangle", "book", "tube", "square", "sixedge"]
export const colorPalette = ["#6845f5", "#8645f5", "#a045f5", "#bd45f5", "#ef45f5", "#f545c3", "#f54591", "#f54571", "#f54545", "#f55c45", "#f57745", "#f5a945", "#f5c945", "#f5ef45", "#b7f545", "#8bf545", "#5cf545", "#45f565", "#45f5c0", "#45c9f5", "#45aff5", "#4586f5", "#455ff5", "#4545f5"]

export const headerStyle = {

    backgroundColor: p.bg2,
}

export const shadow = {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2
}

const styles = StyleSheet.create({
    bodyWrapper: {
        backgroundColor: p.bg1
    },
    body: {
        backgroundColor: p.bg1,
        color: p.text__main,
        height: "100%",
        display: "flex",
        alignItems: 'center',
        maxWidth: 500,
        alignSelf: "center"
    },
    projectCard: {
        backgroundColor: p.bg2,
        width: "100%",
        margin: 5,
        padding: 10,
        paddingVertical: 13,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: p.br,
        justifyContent: "space-between",
        alignSelf: "center",
        ...shadow
    },
    shadow: {
        ...shadow
    },
    dayTitle: {
        marginLeft: 5,
        color: p.text__main,
        fontSize: 16,
    },
    text: {
        color: p.text__main,
        fontSize: 16,
    },
    buttonText: {
        textAlign: "center"
    },
    textDim: {
        color: p.text__dim
    },
    input: {
        height: 40,
        width: "40%",
        margin: 12,
        padding: 10,
        color: p.text__main,
        backgroundColor: p.bg2,
        borderRadius: p.br
    },
    navbarTopMargin: {
        height: 100,
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: p.bg2,
        borderRadius: p.br,
    },
    logoWrapper: {
        height: 38,
        width: 38,
        borderRadius: p.br,
        backgroundColor: p.bg1,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const gestureRecognizerConfig = {
    velocityThreshold: 0.5,
    directionalOffsetThreshold: 80
}

export default styles