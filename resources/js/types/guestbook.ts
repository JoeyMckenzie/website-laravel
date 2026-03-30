export type GuestbookEntry = {
    id: number;
    github_username: string;
    github_avatar: string;
    body: string;
    created_at: string;
};

export type GithubUser = {
    username: string;
    avatar: string;
} | null;
