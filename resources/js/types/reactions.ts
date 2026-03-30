export type ReactionType = 'fire' | 'thumbs_up' | 'mind_blown' | 'heart';

export type ReactionCounts = Record<ReactionType, number>;

export type ReactionsResponse = {
    counts: Partial<ReactionCounts>;
    userReactions: ReactionType[];
};
