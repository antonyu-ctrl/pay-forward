// Centralized chain mock data for chain detail and network screens

export interface ChainParticipant {
    id: string;
    username: string;
    name: string;
    avatarUrl: string;
}

export interface ChainTimelineEvent {
    id: string;
    participant: ChainParticipant;
    message: string;
    time: string;
    status: 'response_needed' | 'pay_forward_response' | 'completed';
    reactions: number;
}

export interface ChainData {
    id: string;
    title: string;
    category: 'coffee' | 'book';
    status: 'Active' | 'Completed';
    startDate: string;
    stats: {
        generation: number;
        maxDepth: number;
        impact: number;
    };
    participants: string[];
    type: 'ignited' | 'invited';
    isArchived: boolean;
    timeline: ChainTimelineEvent[];
}

// Shared participant pool
const PARTICIPANTS: Record<string, ChainParticipant> = {
    anton: {
        id: 'anton',
        username: 'Anton_Yu',
        name: 'Anton Yu',
        avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
    sarah: {
        id: 'sarah',
        username: 'sarah_writer',
        name: 'Sarah Jenkins',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
    david: {
        id: 'david',
        username: 'David_G',
        name: 'David Miller',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    lisa: {
        id: 'lisa',
        username: 'Lisa_K',
        name: 'Lisa Kim',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    mike: {
        id: 'mike',
        username: 'Mike_T',
        name: 'Mike Thompson',
        avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    alex: {
        id: 'alex',
        username: 'alex_builder',
        name: 'Alex Chen',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
    emily: {
        id: 'emily',
        username: 'Emily_R',
        name: 'Emily Roberts',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
    james: {
        id: 'james',
        username: 'James_W',
        name: 'James Wilson',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
};

export const MOCK_CHAINS: Record<string, ChainData> = {
    '1': {
        id: '1',
        title: 'Morning Coffee Relay',
        category: 'coffee',
        status: 'Active',
        startDate: '2025-02-10',
        stats: { generation: 3, maxDepth: 5, impact: 14 },
        participants: [
            PARTICIPANTS.sarah.avatarUrl,
            PARTICIPANTS.david.avatarUrl,
            PARTICIPANTS.lisa.avatarUrl,
        ],
        type: 'ignited',
        isArchived: false,
        timeline: [
            {
                id: 't1-1',
                participant: PARTICIPANTS.anton,
                message: 'Started the Morning Coffee Relay! Bought a coffee for Sarah at the local cafe.',
                time: '2h ago',
                status: 'pay_forward_response',
                reactions: 8,
            },
            {
                id: 't1-2',
                participant: PARTICIPANTS.sarah,
                message: '"Sarah bought you a coffee through a donation token. Enjoy your morning brew!"',
                time: 'Received 2h ago',
                status: 'response_needed',
                reactions: 3,
            },
            {
                id: 't1-3',
                participant: PARTICIPANTS.anton,
                message: 'You volunteered 2 hours at the local shelter in response to Sarah\'s gift.',
                time: '1h ago',
                status: 'pay_forward_response',
                reactions: 8,
            },
            {
                id: 't1-4',
                participant: PARTICIPANTS.david,
                message: '"David shared his premium produce box with a neighbor in need."',
                time: 'Yesterday',
                status: 'pay_forward_response',
                reactions: 5,
            },
            {
                id: 't1-5',
                participant: PARTICIPANTS.lisa,
                message: 'Waiting for Lisa to pay it forward...',
                time: 'Just now',
                status: 'response_needed',
                reactions: 0,
            },
        ],
    },
    '2': {
        id: '2',
        title: 'Book Donation Drive',
        category: 'book',
        status: 'Completed',
        startDate: '2025-01-15',
        stats: { generation: 4, maxDepth: 4, impact: 30 },
        participants: [
            PARTICIPANTS.alex.avatarUrl,
            PARTICIPANTS.emily.avatarUrl,
            PARTICIPANTS.james.avatarUrl,
        ],
        type: 'ignited',
        isArchived: false,
        timeline: [
            {
                id: 't2-1',
                participant: PARTICIPANTS.anton,
                message: 'Started the Book Donation Drive! Donated 10 books to the community library.',
                time: '2 weeks ago',
                status: 'completed',
                reactions: 15,
            },
            {
                id: 't2-2',
                participant: PARTICIPANTS.alex,
                message: 'Alex donated his entire sci-fi collection. Amazing generosity!',
                time: '10 days ago',
                status: 'completed',
                reactions: 12,
            },
            {
                id: 't2-3',
                participant: PARTICIPANTS.emily,
                message: 'Emily organized a reading circle at the local school with donated books.',
                time: '1 week ago',
                status: 'completed',
                reactions: 20,
            },
            {
                id: 't2-4',
                participant: PARTICIPANTS.james,
                message: 'James set up a free book exchange box in the park. Chain completed!',
                time: '3 days ago',
                status: 'completed',
                reactions: 18,
            },
        ],
    },
    'c1': {
        id: 'c1',
        title: 'Pay it Forward: Coffee',
        category: 'coffee',
        status: 'Active',
        startDate: '2025-02-25',
        stats: { generation: 2, maxDepth: 4, impact: 12 },
        participants: [
            PARTICIPANTS.david.avatarUrl,
            PARTICIPANTS.sarah.avatarUrl,
        ],
        type: 'invited',
        isArchived: false,
        timeline: [
            {
                id: 'tc1-1',
                participant: PARTICIPANTS.david,
                message: 'David forwarded the chain to you. Keep the kindness going!',
                time: '10m ago',
                status: 'response_needed',
                reactions: 2,
            },
            {
                id: 'tc1-2',
                participant: PARTICIPANTS.sarah,
                message: 'Sarah started this chain by buying coffee for a stranger.',
                time: '2h ago',
                status: 'pay_forward_response',
                reactions: 6,
            },
        ],
    },
    'c2': {
        id: 'c2',
        title: 'Kindness Chain',
        category: 'coffee',
        status: 'Active',
        startDate: '2025-02-24',
        stats: { generation: 1, maxDepth: 3, impact: 5 },
        participants: [
            PARTICIPANTS.lisa.avatarUrl,
        ],
        type: 'invited',
        isArchived: false,
        timeline: [
            {
                id: 'tc2-1',
                participant: PARTICIPANTS.lisa,
                message: 'Chain forwarded to you. Good luck!',
                time: '1h ago',
                status: 'response_needed',
                reactions: 1,
            },
        ],
    },
    'c3': {
        id: 'c3',
        title: 'Community Coffee Chain',
        category: 'coffee',
        status: 'Completed',
        startDate: '2025-02-20',
        stats: { generation: 4, maxDepth: 4, impact: 20 },
        participants: [
            PARTICIPANTS.mike.avatarUrl,
            PARTICIPANTS.sarah.avatarUrl,
            PARTICIPANTS.david.avatarUrl,
        ],
        type: 'invited',
        isArchived: false,
        timeline: [
            {
                id: 'tc3-1',
                participant: PARTICIPANTS.mike,
                message: 'Coffee chain completed! Thanks everyone for participating.',
                time: '2d ago',
                status: 'completed',
                reactions: 10,
            },
            {
                id: 'tc3-2',
                participant: PARTICIPANTS.sarah,
                message: 'Passed the kindness forward to David.',
                time: '3d ago',
                status: 'completed',
                reactions: 7,
            },
            {
                id: 'tc3-3',
                participant: PARTICIPANTS.david,
                message: 'Bought coffee for a stranger at the local cafe.',
                time: '4d ago',
                status: 'completed',
                reactions: 5,
            },
        ],
    },
    'c4': {
        id: 'c4',
        title: 'Community Book Exchange',
        category: 'book',
        status: 'Active',
        startDate: '2025-02-22',
        stats: { generation: 2, maxDepth: 5, impact: 8 },
        participants: [
            PARTICIPANTS.emily.avatarUrl,
            PARTICIPANTS.james.avatarUrl,
        ],
        type: 'invited',
        isArchived: false,
        timeline: [
            {
                id: 'tc4-1',
                participant: PARTICIPANTS.sarah,
                message: 'Book exchange chain is still active. Keep sharing!',
                time: '3d ago',
                status: 'pay_forward_response',
                reactions: 4,
            },
            {
                id: 'tc4-2',
                participant: PARTICIPANTS.emily,
                message: 'Shared my favorite novel with a coworker.',
                time: '5d ago',
                status: 'pay_forward_response',
                reactions: 6,
            },
        ],
    },
};

export function getChainById(chainId: string): ChainData | undefined {
    return MOCK_CHAINS[chainId];
}

// Network visualization data
export interface NetworkNode {
    id: string;
    username: string;
    avatarUrl: string;
    x: number;
    y: number;
    connections: string[];
}

export const MOCK_NETWORK: NetworkNode[] = [
    { id: 'anton', username: 'Anton_Yu', avatarUrl: PARTICIPANTS.anton.avatarUrl, x: 0, y: 0, connections: ['sarah', 'david', 'lisa', 'mike', 'alex', 'emily', 'james'] },
    { id: 'sarah', username: 'Sarah J.', avatarUrl: PARTICIPANTS.sarah.avatarUrl, x: -120, y: -160, connections: ['anton', 'david', 'node_a'] },
    { id: 'david', username: 'David M.', avatarUrl: PARTICIPANTS.david.avatarUrl, x: 140, y: -130, connections: ['anton', 'sarah', 'node_b'] },
    { id: 'lisa', username: 'Lisa K.', avatarUrl: PARTICIPANTS.lisa.avatarUrl, x: -170, y: 40, connections: ['anton', 'node_c'] },
    { id: 'mike', username: 'Mike T.', avatarUrl: PARTICIPANTS.mike.avatarUrl, x: 160, y: 60, connections: ['anton'] },
    { id: 'alex', username: 'Alex C.', avatarUrl: PARTICIPANTS.alex.avatarUrl, x: -60, y: 180, connections: ['anton', 'node_d'] },
    { id: 'emily', username: 'Emily R.', avatarUrl: PARTICIPANTS.emily.avatarUrl, x: 80, y: 190, connections: ['anton'] },
    { id: 'james', username: 'James W.', avatarUrl: PARTICIPANTS.james.avatarUrl, x: 0, y: -210, connections: ['anton', 'node_e'] },
    // 2nd-level connections
    { id: 'node_a', username: 'Maria L.', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', x: -240, y: -260, connections: ['sarah'] },
    { id: 'node_b', username: 'Tom R.', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', x: 280, y: -220, connections: ['david'] },
    { id: 'node_c', username: 'Jenny P.', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', x: -300, y: 100, connections: ['lisa'] },
    { id: 'node_d', username: 'Kevin S.', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', x: -120, y: 300, connections: ['alex'] },
    { id: 'node_e', username: 'Rachel G.', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', x: 60, y: -340, connections: ['james'] },
];
