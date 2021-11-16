
import React from 'react'
import { View, Text } from 'react-native'
import Svg, { Path } from "react-native-svg"

export default function ProjectIcons({ figure }) {
    return (
        <>
            {
                (figure === "cube") && <Cube />
            }{
                (figure === "add") && <Add />
            }
        </>
    )
}


function Cube() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={23}
            height={23}
            fill="none"
        >
            <Path
                stroke="#fff"
                d="M11.63 21.981L1.04 17.48a.1.1 0 01-.061-.092V5.529a.1.1 0 01.139-.092l10.474 4.452a.1.1 0 00.078 0l10.613-4.512M11.63 21.981v-9.056m0 9.056l10.591-4.502a.1.1 0 00.06-.092V5.377m0 0L11.669.865a.1.1 0 00-.075 0L4.021 3.867"
            />
        </Svg>
    )
}


function Add() {
    return (
        <Svg
            width={20}
            height={20}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M6.5 5.5V1a1 1 0 011-1h1a1 1 0 011 1v4.5a1 1 0 001 1H15a1 1 0 011 1v1a1 1 0 01-1 1h-4.5a1 1 0 00-1 1V15a1 1 0 01-1 1h-1a1 1 0 01-1-1v-4.5a1 1 0 00-1-1H1a1 1 0 01-1-1v-1a1 1 0 011-1h4.5a1 1 0 001-1z"
                fill="#fff"
            />
        </Svg>
    )
}
