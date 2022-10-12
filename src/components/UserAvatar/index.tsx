import { Avatar, Group, Text } from "@mantine/core"

export type UserAvatarProps = {
    src: string
    children?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ src, children }) => (
    // <Avatar
    //     radius="xl"
    //     alt={props.alt}
    //     src={props.src}
    // />
    <Group>
        <Avatar
            src={src}
            size={32}
        />
        <Text size="sm" sx={{ lineHeight: 1 }}>
            {children}
        </Text>
    </Group>
)
