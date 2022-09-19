import s from "./popup.module.css"

import { Card, Stack, Text, Title, Image, Button } from "@mantine/core"
import Link from "next/link"
import { Popup } from "react-map-gl"

export type ProjectPopupProps = {
    lng: number
    lat: number
    title: string
    caption: string
    src: string | null
    href: string
    projectId: string
}

export const ProjectPopup: React.FC<ProjectPopupProps> = props => {
    return (
        <Popup
            longitude={props.lng}
            latitude={props.lat}
            anchor='top'
            closeButton={false}
            maxWidth='400px'
            className={s.popup}
        >
            <Card withBorder>
                <Card.Section>
                    <Image
                        src={props.src ?? "/wip.png"}
                        height={150}
                        alt=''
                    />
                </Card.Section>
                <Stack>
                    <Title order={3}>
                        {props.title}
                    </Title>
                    <Text>
                        {props.caption}
                    </Text>
                </Stack>
                <Card.Section
                    inheritPadding
                    p='xs'
                    mt='xs'
                >
                    <Link href={props.href} passHref>
                        <Button
                            fullWidth
                            component='a'
                            size='xs'
                        >
                            Посмотреть проект
                        </Button>
                    </Link>
                </Card.Section>
            </Card>
        </Popup>
    )
}
