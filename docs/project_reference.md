# Project Reference: Instagram Clone Analysis

**Reference Repository**: `Instagram-Clone-Coding`
**Reference Diagram**: `Flowchart (Auth -> Home -> Post -> Search -> Notification -> DM -> Profile -> Settings)`

> [!IMPORTANT]
> **Policy**: This repository is for **structural reference only**. Do NOT copy code directly.
> We must build our own unique UX ("Pay Forward") using these patterns as a skeleton, not a skin.
> - **Adopt**: Component modularity, state management structure.
> - **Reject**: Instagram-specific features not relevant to us (e.g., specific filters, DM logic).
> - **Innovate**: Replace "Like" logic with "Ripple/Forward" logic entirely.

## Functional Requirements (Adapted from Flowchart)

### 1. Authentication (Core Skeleton)
*   **Sign Up / Login**: Email & Password + Google Auth (Firebase).
*   **Password Reset**: Essential for user retention.
*   **Start**: Splash Screen -> Auth Flow.

### 2. Main Feed (Home)
*   **Post Item (The "Deed")**:
    *   **Upload**: Photo/Video + Caption.
    *   **Action Bar**:
        *   Like (❤️) -> **Appreciate** (Low effort, high volume).
        *   Comment (💬) -> **Cheer** (Conversation).
        *   Share (✈️) -> **Share External**.
        *   **[NEW] Ripple (🌊)**: View the chain history/future.
        *   **[NEW] Forward (Diff)**: "I'll do something similar!" (Join the chain).
    *   **Save**: Bookmark inspiring deeds.

### 3. Search & Explore
*   **Search**:
    *   **Users**: Find friends to tag/forward to.
    *   **Hashtags**: Find themes (#Coffee, #Kindness).
    *   **[NEW] Projects**: Find Donation Relays.
*   **Recent Search**: Local history for convenience.

### 4. Notifications (The "Loop")
*   **Follow / Tag**: Standard.
*   **[NEW] Chain Alerts**: "Your deed inspired @UserB!" (Critical for retention).
*   **[NEW] Relay Updates**: "The project you supported reached 50%!"

### 5. Profile (Identity)
*   **Grid View**: My Deeds.
*   **Saved**: My Bookmarks.
*   **Tagged**: Where I was tagged as a "beneficiary" (Evidence of receipt).
*   **Follower/Following**: Social graph.
*   **[NEW] Impact Stats**: Total Ripples started, Total Value forwarded.

### 6. Settings
*   **Edit Profile**: Photo, Bio.
*   **Account**: Password change, Logout.

### 7. Direct Message (DM) -> *Simplified*
*   **Adaptation**: Instead of full chat, strictly **"Thank You Notes"**.
*   **Reason**: Prevent spam/abuse. Keep focus on public kindness.
*   **Feature**: "Send a Thank You Card" to the person who helped you.

## Data Structure Implications
*   **User**: Standard + Impact Stats.
*   **Post**: Standard + `chainId` + `parentId` (for Ripple).
*   **Notification**: Needs custom types for Chain events.
