import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // PLACEHOLDER API AND DATA
    setTimeout(() => {
        res.json({
            owned: [
                {
                    name: 'Газон на ул Пушкина',
                    description: 'проект по уходу рядом с Домом Колотушкина',
                    image: '/wip.png',
                    href: '/project/test',
                },
            ],
            following: [
                {
                    name: 'Грядочки да кочечки',
                    description: 'Это такой проект в котором не только кочки но еще и грядки',
                    image: '/wip.png',
                    href: '/project/test',
                },
                {
                    name: 'Белые розы',
                    description: 'Давайте выкрашивать розы вашей парадной в БЕЛЫЙ',
                    image: '/wip.png',
                    href: '/project/test',
                },
                {
                    name: 'Рыба',
                    description: 'Такой рыбный проект, он просто есть для рыбы',
                    image: '/wip.png',
                    href: '/project/test',
                },
            ]
        })
    }, 1000);
}