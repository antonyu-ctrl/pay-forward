import { FeedItemProps } from '../components/Feed/PayForwardFeedItem';

// ── Home Feed Data ──────────────────────────────────────────
export const HOME_FEED_DATA: FeedItemProps[] = [
    {
        id: '1',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
        username: 'community_roots',
        timeAgo: '2h ago',
        mainImageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        forwardedTo: '@alice',
        caption: 'Treated Alice to a warm coffee today. It\u2019s small, but it starts here. \u2615\ufe0f',
        likesCount: 24,
    },
    {
        id: '2',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
        username: 'alex_builder',
        timeAgo: '5h ago',
        mainImageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        forwardedTo: '@mark_k',
        caption: 'Passed on the kindness by helping Mark with his moving boxes. Paying it forward!',
        likesCount: 56,
        replies: [
            {
                avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                username: 'Anton_Yu',
                timeAgo: '4h',
                forwardedTo: '@mark_k',
                caption: 'Love seeing this! I was just talking to Mark yesterday.',
                likesCount: 12,
                id: '2a',
            }
        ]
    },
    {
        id: '3',
        avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
        username: 'sarah_writer',
        timeAgo: '1d ago',
        forwardedTo: '@community_center',
        caption: 'Just dropped off some books at the local community center. Reading can change lives! \ud83d\udcda\u2728 Hope they find good homes.',
        likesCount: 15,
    },
];

// ── All Feeds (for detail pages) ────────────────────────────
export const ALL_FEEDS: Record<string, any> = {
    // ── HomeFeed items ──
    '1': {
        id: '1',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'community_roots',
        timeAgo: '2h ago',
        mainImageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80',
        forwardedTo: '@alice',
        caption: 'Treated Alice to a warm coffee today. It\u2019s small, but it starts here. \u2615\ufe0f',
        likesCount: 24,
        replies: [
            {
                id: 'r1a',
                avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                username: 'alex_builder',
                timeAgo: '1h ago',
                caption: 'This is amazing! Keep it up! \ud83d\ude4c',
                likesCount: 3,
            },
            {
                id: 'r1b',
                avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                username: 'emily_h',
                timeAgo: '45m ago',
                caption: 'Love this chain of kindness! I want to join too!',
                likesCount: 1,
            },
        ],
    },
    '2': {
        id: '2',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'alex_builder',
        timeAgo: '5h ago',
        mainImageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
        forwardedTo: '@mark_k',
        caption: 'Passed on the kindness by helping Mark with his moving boxes. Paying it forward!',
        likesCount: 56,
        replies: [
            {
                id: '2a',
                avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                username: 'Anton_Yu',
                timeAgo: '4h',
                caption: 'Love seeing this! I was just talking to Mark yesterday.',
                likesCount: 12,
            },
        ],
    },
    '3': {
        id: '3',
        avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'sarah_writer',
        timeAgo: '1d ago',
        forwardedTo: '@community_center',
        caption: 'Just dropped off some books at the local community center. Reading can change lives! \ud83d\udcda\u2728 Hope they find good homes.',
        likesCount: 15,
        replies: [],
    },
    // ── Profile > Post (Thread) items ──
    '4': {
        id: '4',
        avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'Anton_Yu',
        timeAgo: '2h',
        forwardedTo: 'Sarah Jenkins',
        caption: 'Just bought coffee for the person behind me in line! Let\u2019s keep the kindness going. \u2615\ufe0f\u2728',
        likesCount: 15,
        replies: [],
    },
    '5': {
        id: '5',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'Jane_Doe',
        timeAgo: '4h',
        forwardedTo: 'Local Food Bank',
        caption: 'Dropped off some canned goods today. Small acts can make a big difference! \ud83e\udd6b',
        mainImageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80',
        likesCount: 34,
        replies: [
            {
                id: '5a',
                avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                username: 'Anton_Yu',
                timeAgo: '3h',
                forwardedTo: 'Community Center',
                caption: 'That is so awesome! I\u2019m going to do the same this weekend. Thanks for the inspiration!',
                likesCount: 5,
            },
        ],
    },
    '6': {
        id: '6',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        username: 'David_G',
        timeAgo: '5h',
        forwardedTo: 'City Park Cleanup',
        caption: 'Team effort! Collected 10 bags of trash from the park today \ud83c\udf31',
        likesCount: 89,
        replies: [
            {
                id: '6a',
                avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                username: 'Anton_Yu',
                timeAgo: '4h',
                forwardedTo: 'City Park Cleanup',
                caption: 'Great job out there! I am going to try and make it out next month if it happens again.',
                likesCount: 12,
            },
            {
                id: '6b',
                avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
                username: 'Emma_W',
                timeAgo: '2h',
                forwardedTo: 'City Park Cleanup',
                caption: 'I was there too! The park looks so much better now. Everyone did wonderful work.',
                likesCount: 5,
            },
        ],
    },
    // ── Profile > Following items ──
    '7': {
        id: '7',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
        username: 'Emma_W',
        timeAgo: '1h',
        forwardedTo: 'Local Animal Shelter',
        caption: 'Spent the morning walking dogs. They are all so sweet and need homes! \ud83d\udc36\u2764\ufe0f',
        mainImageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500&q=80',
        likesCount: 112,
        replies: [],
    },
};
