import React, { Dispatch, SetStateAction } from 'react'

type ProjectSideMenuContextProps = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    openId: string
    setOpenId: Dispatch<SetStateAction<string>>
}

export const ProjectSideMenuContext = React.createContext<ProjectSideMenuContextProps>({
    open: true,
    setOpen: () => null,
    openId: 'info',
    setOpenId: () => null,
})
