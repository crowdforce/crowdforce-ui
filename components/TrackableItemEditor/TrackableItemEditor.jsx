import {
    Button,
    Dialog, DialogContent, DialogTitle, Typography,
} from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import ajax from "../../utils/ajax"
import classes from "./TrackableItemEditor.module.css"
import Form from "../Form"
import FormInput from "../Form/FormInput"
import useApi from "../../utils/useApi"
import formClasses from "../Form/Form.module.css"

const TrackableItemEditor = (props) => {
    const {
        open,
        onClose,
        projectId = null,
        onDelete = () => {},
        activityId = null,
        activityItemId = null,
    } = props
    const itemsApi = useApi(`/api/projects/${projectId}/activities/${activityId}/items`)
    const itemApi = useApi(`/api/projects/${projectId}/activities/${activityId}/items/${activityItemId}`)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const itemData = useMemo(() => (itemsApi.data || [])
        .find(({ id }) => String(id) === String(activityItemId))
  || {}, [itemsApi.data, activityItemId])

    const handleDelete = () => {
        ajax.delete(`/api/projects/${projectId}/activities/${activityId}/items/${activityItemId}`).then(() => {
            itemsApi.fetch()
            setOpenDeleteDialog(false)
            onDelete()
            onClose()
        })
    }

    const handleDeleteButtonClick = () => {
        setOpenDeleteDialog(true)
    }

    const handleDeleteDialogCancel = () => {
        setOpenDeleteDialog(false)
    }

    const submit = (data) => {
        const request = activityItemId !== null ? ajax.put(`/api/projects/${projectId}/activities/${activityId}/items/${activityItemId}`, data)
            : ajax.post(`/api/projects/${projectId}/activities/${activityId}/items`, data)

        return request.then(() => {
            itemsApi.fetch()
            onClose()
        })
    }

    return (
        <>
            <Dialog
                maxWidth="sm"
                fullWidth
                className={classes.root}
                open={!openDeleteDialog && open}
                onClose={onClose}
                scroll="body"
            >
                <Form
                    loading={activityItemId !== null && itemApi.isLoading}
                    formData={itemData}
                    submit={submit}
                >
                    <DialogTitle>{activityItemId !== null ? "Редактировать элемент" : "Новый элемент"}</DialogTitle>
                    <DialogContent>
                        <FormInput
                            name="name"
                            label="Имя элемента"
                        />
                    </DialogContent>
                    <div className={classes.dialogActions}>
                        <Button onClick={onClose}>Отмена</Button>
                        <div>
                            {activityItemId !== null && <Button style={{ marginRight: "16px" }} onClick={handleDeleteButtonClick}>Удалить</Button>}
                            <Button type="submit" color="primary" variant="contained">Сохранить</Button>
                        </div>
                    </div>
                </Form>
            </Dialog>
            <Dialog
                maxWidth="sm"
                fullWidth
                open={openDeleteDialog}
            >
                <DialogTitle>Удалить элемент</DialogTitle>
                <DialogContent>
                    <Typography style={{ paddingBottom: "20px" }}>
            Вы уверены, что хотите удалить элемент?
                    </Typography>
                </DialogContent>
                <div className={formClasses.formActions}>
                    <Button onClick={handleDeleteDialogCancel} variant="contained" disableElevation>Отмена</Button>
                    <Button onClick={handleDelete}>Удалить</Button>
                </div>
            </Dialog>
        </>
    )
}

export default observer(TrackableItemEditor)
