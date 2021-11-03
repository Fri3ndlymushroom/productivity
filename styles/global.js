import { StyleSheet } from 'react-native';

export const p = {
    bg1: "#191B2A",
    bg2: "#1C2033",

    hl: "#5755D3",

    text__main: "#FFFFFF",
    text__dim: "#444866",

    br: 10
}



export const headerStyle = {

    backgroundColor: p.bg2,
}

const shadow = {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: p.bg1,
        color: p.text__main,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    projectCard: {
        backgroundColor: p.bg2,
        width: 300,
        margin: 5,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: p.br,
        justifyContent: "space-between",
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
        color: p.text__main
    },
    textDim:{
        color: p.text__dim
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default styles