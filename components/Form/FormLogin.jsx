import { Typography } from "@mui/material"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import UserButton from "../../src/components/UserButton"
import formClasses from "./Form.module.css"

const FormLogin = ({ message }) => (
    <div className={formClasses.emptyState}>
        <AssignmentIndIcon color="disabled" style={{ width: "200px", height: "200px" }} />
        <Typography className={formClasses.emptyStateActions}>{message}</Typography>
        <UserButton />
    </div>
)

export default FormLogin
