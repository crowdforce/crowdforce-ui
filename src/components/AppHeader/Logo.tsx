import Link from 'next/link'
import { Avatar, Badge, Group, MediaQuery, Text } from '@mantine/core'

export const Logo = () => (
    <Link href={'/'} passHref>
        <MediaQuery smallerThan='md' styles={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
        }}>
            <Group sx={{
                userSelect: 'none',
                cursor: 'pointer',
            }}>
                <Avatar
                    src={'/favicon-96x96.png'}
                />
                <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
                    <Text size={'xl'}>CROWD FORCE</Text>
                </MediaQuery>
                <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
                    <Badge>Beta</Badge>
                </MediaQuery>
            </Group>
        </MediaQuery>
    </Link>
)
