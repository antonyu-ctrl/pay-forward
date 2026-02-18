# Project Roadmap: Pay Forward

## Phase 1: Foundation & SNS MVP (Current Focus)
- [x] **Project Initialization**
    - [x] Initialize Expo project (TypeScript, Expo Router) <!-- id: 10 -->
    - [x] Configure NativeWind (Tailwind CSS) <!-- id: 11 -->
    - [x] Set up Firebase Project & Config <!-- id: 12 -->
    - [x] Implement Responsive Layout (Web/Mobile) <!-- id: 13 -->
    - [x] Define Project Scope & Core Concept <!-- id: 0 -->
    - [x] Define Tech Stack & Architecture (React Native Web + GCP) <!-- id: 1 -->
    - [x] Create detailed functional requirements (User Stories) <!-- id: 2 -->
    - [x] Design Database Schema (Firestore) <!-- id: 3 -->
    - [x] Finalize Project Documentation for Agents <!-- id: 4 -->

- [x] **UI/UX Design (Agent: Designer)**
    - [x] Design Home Feed (Visual & Text Cards) <!-- id: 100 -->
    - [x] Design 'Pay Forward' Specific Item (Type A) <!-- id: 103 -->
    - [ ] Design Ripple Chain Visualization <!-- id: 101 -->
    - [ ] Design Donation Relay Screen <!-- id: 102 -->

- [/] **Feature Development (Agent: Vector)**
    - [/] **Home Feed (Phase 1)**
        - [x] Implement `PayForwardFeedItem` (Pe-Po Feed) <!-- id: 200 -->
        - [ ] Implement `FeedList` (FlatList/FlashList) <!-- id: 201 -->
        - [x] Refactor `StoriesBar` (Start Forwarding + Active Chains) <!-- id: 202 -->

    - [ ] **UI/UX Refinement**
        - [x] **Theme Change**: Green -> Light Blue (Cyan/Sky) <!-- id: 400 -->
        - [x] **ForwardBar**: Implement Animated Gradient Border for Active Users <!-- id: 401 -->

    - [ ] **Feature Implementation**
        - [ ] **Create Forward Screen**: Select Card, Message, Amount <!-- id: 500 -->

    - [ ] **Navigation & Architecture (Web / Mobile Web)**
        - [x] Implement Responsive Layout (Desktop: Top Nav, Mobile Web: Bottom Tab) <!-- id: 300 -->
        - [ ] Create `MyForward` Screen <!-- id: 301 -->
        - [ ] Create `ChainDetail` Screen (Friend Activity) <!-- id: 302 -->
        - [ ] **[LATER]** Native Mobile App Optimization

- [ ] **Authentication**
    - [ ] Login Screen (Email/Google) <!-- id: 20 -->
    - [ ] User Profile Management <!-- id: 21 -->

- [ ] **SNS Core Features**
    - [ ] "Good Deed" Post Creation (Photo/Text) <!-- id: 30 -->
    - [ ] Main Feed (Infinite Scroll) <!-- id: 31 -->
    - [ ] Interaction (Like, Comment, Share) <!-- id: 32 -->

## Phase 2: Location & Discovery
- [ ] **Geolocation Services**
    - [ ] Implement Map View (Google Maps) <!-- id: 40 -->
    - [ ] Location Permission & User Tracking <!-- id: 41 -->
    - [ ] NPO/Project Discovery Logic (Geo-queries) <!-- id: 42 -->

## Phase 3: Funding Ecosystem
- [ ] **Funding System**
    - [ ] Project Detail Page <!-- id: 50 -->
    - [ ] Payment Gateway Integration <!-- id: 51 -->
    - [ ] Donation Tracking & Reports <!-- id: 52 -->
