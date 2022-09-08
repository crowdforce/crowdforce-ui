import { ErrorDto } from "@/common/types";
import { NextApiRequest, NextApiResponse } from "next";

// on types for Task ):

const dataPlaceholder = [
    {
        id: 'one',
        title: 'Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки',
        description: 'Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.',
        dateStart: '06.06.2022',
        timeStart: '10:00',
        dateEnd: '07.06.2022',
        timeEnd: '13:00',
        followers: [
            {
                name: 'Арагорн, сын Агронома',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Фродо Беггинс',
                image: '/ms-icon-150x150.png',
                status: 'leader',
            },
            {
                name: 'Шмыга',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Пендальф Серый',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
        ]
    },
    {
        id: 'two',
        title: 'Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки',
        description: 'Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.',
        dateStart: '06.06.2022',
        timeStart: '11:00',
        dateEnd: '06.07.2022',
        timeEnd: '13:00',
        followers: [
            {
                name: 'Арагорн, сын Агронома',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Фродо Беггинс',
                image: '/ms-icon-150x150.png',
                status: 'leader',
            },
            {
                name: 'Шмыга',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Сильмариллион Варфолломилович',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
        ]
    },
    {
        id: 'tree',
        title: 'Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки',
        description: 'Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.',
        dateStart: '06.06.2022',
        timeStart: '10:00',
        dateEnd: '06.06.2022',
        timeEnd: '13:00',
        followers: [
            {
                name: 'Арагорн, сын Агронома',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Фродо Беггинс',
                image: '/ms-icon-150x150.png',
                status: 'leader',
            },
            {
                name: 'Шмыга',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Пендальф Серый',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
        ]
    },
    {
        id: 'four',
        title: 'Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки',
        description: 'Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.',
        dateStart: '06.06.2022',
        timeStart: '10:00',
        dateEnd: '06.06.2022',
        timeEnd: '13:00',
        followers: [
            {
                name: 'Арагорн, сын Агронома',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Фродо Беггинс',
                image: '/ms-icon-150x150.png',
                status: 'leader',
            },
            {
                name: 'Шмыга',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Пендальф Серый',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
        ]
    },
]


export async function getTasks(projectId: string) {
    await setTimeout(() => null, 1000)
    return dataPlaceholder
}



export default async (req: NextApiRequest, res: NextApiResponse<any[] | ErrorDto>) => {
    if (req.method !== 'GET') {
        return res.status(404).json({
            error: 'Not found',
        })
    }

    const projectId = req.query.projectId as string

    const tasks = await getTasks(projectId)
    if (!tasks) {
        return res.status(404).json({
            error: 'Not found',
        })
    }

    return res.json(tasks)

}
