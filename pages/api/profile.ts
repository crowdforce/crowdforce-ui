import { getProjects } from '@/server/controllers/profile';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const data = await getProjects('')

    // PLACEHOLDER API AND DATA
    setTimeout(() => {
        res.json(data)
    }, 1000);
}