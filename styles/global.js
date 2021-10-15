import { StyleSheet } from 'react-native';

export const p = {
    bg1: "#1b1b27",
    bg2: "#202231",
    bg3: "#2d2f41",

    text__main: "#ffffff",
    text__dim: "#a6a7ab",

    br: "10px"
}



export const headerStyle = {

    backgroundColor: p.bg2,
}




const styles = StyleSheet.create({
    projectContainer:{
        backgroundColor: p.bg2,
        width: "300px",
        margin: "5px",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        borderRadius: p.br,
        justifyContent: "space-between"
    },
    dayTitle:{
        marginLeft: "5px",
        color: p.text__main
    },
    container: {
        flex: 1,
        backgroundColor: p.bg1,
        color: p.text__main,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: p.text__main
    }
});

export default styles