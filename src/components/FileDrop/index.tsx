import { Group, useMantineTheme } from "@mantine/core"
import { IconUpload, IconX } from "@tabler/icons"
import { Dropzone, DropzoneProps } from "@mantine/dropzone"

export type FileDropProps = Omit<DropzoneProps, "children"> & {
    children?: React.ReactNode
}

export const FileDrop: React.FC<FileDropProps> = props => {
    const theme = useMantineTheme()

    return (
        <Dropzone {...props}>
            <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: "none" }}>
                <Dropzone.Accept>
                    <IconUpload
                        size={50}
                        stroke={1.5}
                        color={theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]}
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <IconX
                        size={50}
                        stroke={1.5}
                        color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                    />
                </Dropzone.Reject>
                {props.children}
            </Group>
        </Dropzone>
    )
}
