import { ProjectSideMenuIds } from "@/components/ProjectSideMenu"
import React, { Dispatch, SetStateAction } from "react"

type ProjectSideMenuContextProps = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    openId: ProjectSideMenuIds
    setOpenId: Dispatch<SetStateAction<ProjectSideMenuIds>>
    wide: boolean
    setWide: React.Dispatch<React.SetStateAction<boolean>>
    isAdmin: boolean
    isInit: boolean
}

export const ProjectSideMenuContext = React.createContext<ProjectSideMenuContextProps>({
    open: true,
    setOpen: () => null,
    openId: "info",
    setOpenId: () => null,
    wide: true,
    setWide: () => null,
    isAdmin: false,
    isInit: false,
})
