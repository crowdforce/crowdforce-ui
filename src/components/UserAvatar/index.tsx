import { Avatar } from '@mui/material'

export type UserAvatarProps = {
  src: string
}

export const UserAvatar = (props: UserAvatarProps) => (
  <Avatar
    alt="Remy Sharp"
    src={props.src}
  />
)
