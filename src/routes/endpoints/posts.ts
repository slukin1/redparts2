/* eslint-disable import/prefer-default-export */

// application
import { delayResponse } from '~/routes/utils';
import { IPost } from '~/interfaces/post';
import { posts as dbPosts } from '~/routes/database/posts';

export function getLatestPosts(limit: number): Promise<IPost[]> {
    return delayResponse(Promise.resolve(dbPosts.slice(0, limit)));
}
