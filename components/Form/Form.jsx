/* eslint-disable react/jsx-props-no-spreading */
import {
    createContext, useContext, useEffect, useState,
} from "react"
import { observer } from "mobx-react-lite"
import formClasses from "./Form.module.css"
import FormLogin from "./FormLogin"
import FormProgress from "./FormProgress"
import useApi from "../../utils/useApi"

export const FormContext = createContext({
    formData: {},
})
export const useFormContext = () => useContext(FormContext)

const Form = ({
    children,
    formData: formDataProp,
    authMessage,
    submit,
    loading: loadingProp,
    resetData = false,
    onChange,
}) => {
    const userApi = useApi("/api/auth/user")
    const [formData, setFormData] = useState(formDataProp ?? {})
    const [formErrors, setFormErrors] = useState({})
    const [isSaving, setIsSaving] = useState(false)

    const isLoading = loadingProp || isSaving
    const requireLogin = authMessage && !userApi.data?.name

    useEffect(() => {
        setFormData(formDataProp ?? {})
    }, [formDataProp])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        const newData = { ...formData, [name]: value }
        if (onChange) {
            onChange(newData)
        } else {
            setFormData(newData)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsSaving(true)
        setFormErrors({})

        try {
            await submit(formData)
        } catch (error) {
            setFormErrors(error)
        }

        if (resetData) {
            setFormData({})
        }

        setIsSaving(false)
    }

    return (
        <FormContext.Provider value={{
            formData,
            formErrors,
            handleInputChange,
        }}
        >
            <form onSubmit={handleFormSubmit} className={formClasses.root}>
                {requireLogin ? <FormLogin message={authMessage} /> : children}
                {isLoading && <FormProgress />}
            </form>
        </FormContext.Provider>
    )
}

export default observer(Form)
