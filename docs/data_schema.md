# Firestore Data Schema

## 1. `users` Collection
Profiles and global stats.
```typescript
interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  stats: {
    chainsStarted: number;
    tasksCompleted: number; // Deeds done
    totalImpact: number; // Downstream nodes created from my starts
  };
  badges: string[]; // ['starter_bronze', 'relay_master', etc.]
}
```

## 2. `chains` Collection
Meta-data for a specific movement (Action or Relay).
```typescript
interface Chain {
  id: string;
  creatorId: string;
  name: string; // "Morning Coffee Relay"
  type: 'ACTION' | 'RELAY';
  targetProjectId?: string; // If RELAY, points to NPO/Project
  config: {
    requiredForwards: number; // How many people next person must tag (N)
  };
  stats: {
    totalParticipants: number;
    depth: number;
    activeBranches: number;
  };
  createdAt: Timestamp;
}
```

## 3. `posts` (The Nodes)
Every post is a node in a chain.
```typescript
interface Post {
  id: string;
  chainId: string; // Parent Chain
  authorId: string;
  parentId: string | null; // The post that tagged me (null if ROOT)
  
  // Content
  mediaUrl?: string; // Photo/Video
  text: string;
  type: 'Visual' | 'TextCard';
  
  // Forwarding Logic
  taggedUsers: string[]; // Who I nominated [uid1, uid2]
  completedForwards: number; // How many of them actually posted
  
  // Standard Social
  likesCount: number;
  commentsCount: number;
  
  createdAt: Timestamp;
}
```

## 4. `projects` Collection (For Relays)
The targets for donations.
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  organizationName: string;
  location: GeoPoint;
  funding: {
    goal: number;
    current: number;
    donorCount: number;
  };
}
```
