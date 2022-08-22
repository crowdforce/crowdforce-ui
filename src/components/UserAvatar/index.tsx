import { Avatar } from '@mantine/core'

export type UserAvatarProps = {
  alt?: string
  src: string
}

export const UserAvatar = (props: UserAvatarProps) => (
  <Avatar
    radius="xl"
    alt={props.alt}
    src={props.src}
  />
)
