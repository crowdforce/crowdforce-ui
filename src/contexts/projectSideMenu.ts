import { ProjectSideMenuIds } from '@/components/ProjectSideMenu'
import React, { Dispatch, SetStateAction } from 'react'

type ProjectSideMenuContextProps = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    openId: Exclude<ProjectSideMenuIds, 'aside'>
    setOpenId: Dispatch<SetStateAction<Exclude<ProjectSideMenuIds, 'aside'>>>
}

export const ProjectSideMenuContext = React.createContext<ProjectSideMenuContextProps>({
    open: true,
    setOpen: () => null,
    openId: 'info',
    setOpenId: () => null,
})
