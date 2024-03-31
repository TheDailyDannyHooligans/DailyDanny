import { kv } from '@vercel/kv';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const formData = await requestAnimationFrame.formData();
        const email = formData.get('email');

        const article = {
            title: title,
            author: formData.get('author'),
            articleText: formData.get('articleText')
        };
        await kv.set(email, user);
        return {sucess: true};

    }
}