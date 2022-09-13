import {
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
    createTheme,
    adaptV4Theme,
} from "@mui/material/styles"
import createGenerateClassName from "@mui/styles/createGenerateClassName"
import StylesProvider from "@mui/styles/StylesProvider"
import React from "react"

import { amber as primary, blue as secondary } from "@mui/material/colors"

const theme = createTheme(adaptV4Theme({
    palette: {
        primary,
        secondary,
        action: {
            selected: "rgba(168,119,255,0.08)",
        },
    },
}))

const generateClassName = createGenerateClassName({
    seed: "rc",
})

const ThemeProvider = ({ children }) => (
    <StylesProvider generateClassName={generateClassName}>
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </StyledEngineProvider>
    </StylesProvider>
)

export default ThemeProvider
