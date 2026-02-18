# Pay Forward - Functional Specifications

## Core Features

### 1. The "Pay Forward Chain" (Action-Based)
- **Concept**: User A does a good deed (e.g., buys coffee) -> Tags User B -> User B must "pay it forward" to $N$ people.
- **Attributes**:
  - **Chain Name**: Customized by starter (e.g., "Monday Morning Coffee").
  - **Branching Factor**: Configurable $N$ (User B must forward to 1, 2, or 3 people).
  - **Tracking**:
    - **Chain Stats**: Total participants in this specific chain.
    - **Personal Stats**: Total people impacted by *me* across all chains.
    - **Badges**: Rewards based on "Forward Token" score (Bronze/Silver/Gold/Platinum).

### 2. The "Donation Relay" (Project-Based)
- **Concept**: User selects a specific Project/NPO -> Donates -> Nominates 2 friends -> They accept & donate -> Repeat.
- **Mechanism**:
  - **Target**: Must be a verified Project/NPO in the app.
  - **Nomination**: Push notification to tagged users (Pending State -> Accepted).
  - **Goal**: Virality for fundraising (Ice Bucket Challenge style).

### 3. Unified Feed UI
- **View Mode**: Standard "Instagram-style" card.
- **Toggle Interaction**:
  - Tab A: **Comments** (Standard conversation).
  - Tab B: **Chain View** (Visual tree or list of participants/next in line).

## Data Architecture Strategy
- **Graph Structure**: Since both features are tree-based, we will use a **Reference Pattern** in Firestore.
- **Denormalization**: To ensure fast reads (e.g., "Total Impact: 1,240 people"), we will use Cloud Functions to increment counters on parent documents whenever a new node is added.
