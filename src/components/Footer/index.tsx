import { Center, Footer as FooterMantine, MediaQuery } from '@mantine/core'
import { AppMenu } from '../AppMenu'

export const Footer: React.FC = () => (
    <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
        <FooterMantine
            height={60}
            p={'sm'}
        >
            <Center>
                <div>
                    <AppMenu />
                </div>
            </Center>
        </FooterMantine>
    </MediaQuery>
)
