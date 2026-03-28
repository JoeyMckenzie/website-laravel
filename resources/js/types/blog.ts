export type Tag = {
    id: number;
    name: string;
    hash_tagged: string;
};

export type PostSummary = {
    slug: string;
    title: string;
    description: string;
    image: string;
    tag_id: number;
    published_at: string | null;
    formatted_published_at: string;
    tag: Tag;
};

export type PostDetail = {
    slug: string;
    title: string;
    description: string;
    image: string;
    published_at: string | null;
    formatted_published_at: string;
    tag: Tag;
};
