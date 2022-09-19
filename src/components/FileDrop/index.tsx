import { Group, Text, useMantineTheme } from "@mantine/core"
import { IconUpload, IconPhoto, IconX } from "@tabler/icons"
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
                <Dropzone.Idle>
                    <IconPhoto size={50} stroke={1.5} />
                </Dropzone.Idle>

                <div>
                    <Text size="xl" inline>
                        Drag images here or click to select files
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                </div>
            </Group>
        </Dropzone>
    )
}
