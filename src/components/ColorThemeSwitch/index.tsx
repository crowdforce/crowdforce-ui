import { createStyles, UnstyledButton, useMantineColorScheme } from "@mantine/core"
import { IconMoonStars, IconSun } from "@tabler/icons"
import { forwardRef } from "react"

const useStyles = createStyles((theme) => ({
    icon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: theme.spacing.xs,
    },
}))

export type ColorThemeSwitchProps = {

}

export const ColorThemeSwitch: React.FC<ColorThemeSwitchProps> = forwardRef<HTMLButtonElement>((props, ref) => {
    const { classes: s } = useStyles()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const dark = colorScheme === "dark"

    return (
        <UnstyledButton
            ref={ref}
            {...props}
            onClick={() => toggleColorScheme()}
        >
            <div className={s.icon}>
                {dark
                    ? <IconSun size={16} />
                    : <IconMoonStars size={16} />
                }
            </div>
            {dark
                ? "Светлая тема"
                : "Тёмная тема"
            }
        </UnstyledButton>
    )
})

ColorThemeSwitch.displayName = "ColorThemeSwitch"
