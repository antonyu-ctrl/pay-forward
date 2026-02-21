// Central mock user data store

export const MY_USER_ID = 'Anton_Yu';

export interface MockUser {
    id: string;
    username: string;
    name: string;
    avatar: string;
    stats: {
        posts: number;
        followers: number;
        following: number;
    };
    bio: string;
    hasActiveChain?: boolean;
}

export const MOCK_USERS: Record<string, MockUser> = {
    Anton_Yu: {
        id: 'Anton_Yu',
        username: 'Anton_Yu',
        name: 'Anton Yu',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        stats: { posts: 42, followers: 854, following: 120 },
        bio: 'Believer in the ripple effect. 🌊\nStarting small chains of kindness that change the world.\nJoin my latest chain below! 👇',
        hasActiveChain: true,
    },
    alex: {
        id: 'alex',
        username: 'alex',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        stats: { posts: 28, followers: 312, following: 85 },
        bio: 'Spreading kindness one act at a time ✨\nCoffee lover ☕ | Community builder 🤝',
        hasActiveChain: true,
    },
    sarah_writer: {
        id: 'sarah_writer',
        username: 'sarah_writer',
        name: 'Sarah Miller',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        stats: { posts: 56, followers: 1024, following: 200 },
        bio: 'Writer & storyteller 📝\nBelieve in paying it forward through words and deeds.\nNew York 🗽',
        hasActiveChain: false,
    },
    Jane_Doe: {
        id: 'Jane_Doe',
        username: 'Jane_Doe',
        name: 'Jane Doe',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        stats: { posts: 31, followers: 450, following: 98 },
        bio: 'Giving back to the community 🌻',
        hasActiveChain: true,
    },
    David_G: {
        id: 'David_G',
        username: 'David_G',
        name: 'David Garcia',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        stats: { posts: 19, followers: 230, following: 67 },
        bio: 'Environmental activist 🌱\nClean parks, clean planet.',
        hasActiveChain: false,
    },
    Emma_W: {
        id: 'Emma_W',
        username: 'Emma_W',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
        stats: { posts: 37, followers: 580, following: 150 },
        bio: 'Animal lover 🐾 | Volunteer at local shelters',
        hasActiveChain: true,
    },
};

// Followers: users that follow me (Anton_Yu)
export const MY_FOLLOWERS: string[] = [
    'alex',
    'Jane_Doe',
    'David_G',
    'Emma_W',
];

// Following: users that I (Anton_Yu) follow
export const MY_FOLLOWING: string[] = [
    'alex',
    'Jane_Doe',
    'Emma_W',
];

// Helper: check if a user is my follower
export function isMyFollower(userId: string): boolean {
    return MY_FOLLOWERS.includes(userId);
}

// Helper: check if I follow a user
export function doIFollow(userId: string): boolean {
    return MY_FOLLOWING.includes(userId);
}

// Helper: check if there's a mutual relationship (follower or following)
export function hasRelationship(userId: string): boolean {
    return isMyFollower(userId) || doIFollow(userId);
}

// Get a user by ID
export function getUser(userId: string): MockUser | undefined {
    return MOCK_USERS[userId];
}

// Get users list by ID array
export function getUsersByIds(ids: string[]): MockUser[] {
    return ids.map((id) => MOCK_USERS[id]).filter(Boolean) as MockUser[];
}
