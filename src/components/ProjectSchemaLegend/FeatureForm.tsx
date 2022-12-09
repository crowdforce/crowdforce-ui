import { FeatureDto } from "@/common/types"
import { Button, Flex, TextInput } from "@mantine/core"
import { useForm } from "react-hook-form"

export type FeatureOnSubmit = (feature: FeatureDto) => void

export type FeatureFormProps = {
    data: FeatureDto
    onSubmit: FeatureOnSubmit
}

export const FeatureForm: React.FC<FeatureFormProps> = ({ data,onSubmit }) => {
    const { handleSubmit, register } = useForm({
        defaultValues: data,
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction={"column"} gap={"sm"}>
                <TextInput
                    {...register(
                        "title",
                        {
                            required: "Добавьте название",
                        },
                    )}
                    label='Название'
                    required
                />
                {/* <Textarea
                    {...register(
                        "description",
                        {
                            required: "Добавьте описание",
                        },
                    )}
                    label='Описание проекта'
                    required
                    minRows={4}
                /> */}

                <Button
                    fullWidth
                    type='submit'
                >
                    Сохранить
                </Button>
            </Flex>
        </form>
    )
}
