import Link from 'next/link'
import { Avatar, Badge, Group, Text } from '@mantine/core'

export const Logo = () => (
    <Link href={'/'} passHref>
        <Group sx={{
            userSelect: 'none',
            cursor: 'pointer',
        }}>
            <Avatar
                src={'/favicon-96x96.png'}
            />
            <Text size={'xl'}>CROWD FORCE</Text>
            <Badge>Beta</Badge>
        </Group>
    </Link>
)
