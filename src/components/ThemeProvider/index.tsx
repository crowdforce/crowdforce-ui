import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core"
import { useState } from "react"

export type ThemeProviderProps = {
    children?: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
    const toggleColorScheme = (value?: ColorScheme) => {
        if (value) {
            setColorScheme(value)
        } else {
            setColorScheme(colorScheme === "dark" ? "light" : "dark")
        }
    }

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS
                theme={{
                    colorScheme,
                    fontFamily: "Raleway",
                    shadows: {
                        lg: "0 4px 8px 2px rgba(10, 60, 30, 0.05), 0px 8px 16px -4px rgba(0, 0, 0, 0.1), 8px 24px 24px 0px rgba(0, 0, 0, 0)",
                    },
                    spacing: {
                        xs: 8,
                        sm: 10,
                        md: 16,
                        lg: 20,
                        xl: 24,
                    },
                    headings: {
                        fontFamily: "Raleway",
                    },
                    primaryColor: "lime",
                    defaultRadius: "md",
                    white: "#ECF2F6",
                    defaultGradient: { deg: 112, from: "cyan", to: "lime" },
                    datesLocale: "ru",
                    components: {
                        Button: {
                            styles: {
                                label: {
                                    fontWeight: 400,
                                },
                            },
                        },
                        InputWrapper: {
                            styles: (theme) => ({
                                label: {
                                    paddingBottom: theme.spacing.xs,
                                },
                            }),
                        },
                    },
                }}
            >
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
