# Implementation Plan - Pay Forward App

# Create Forward Screen Design (New)

## Goal Description
Create a premium, engaging screen where users initiate a "Pay Forward" chain. This screen must be distinct from a standard transaction form; it should feel like sending a meaningful gift or starting a movement.

## Proposed UX Flow

The screen will be composed of three main "Cards" or sections that the user flows through, creating a sense of building a package.

### 1. The "Forward Card" Selection (Visual Centerpiece)
Instead of a simple list, we will use a **Horizontal Snap Carousel** showcasing beautifully designed digital cards.
*   **interaction**: Users swipe to pick a theme (e.g., "Coffee", "Meal", "Book", "Just Help").
*   **Visuals**: Each card has a unique gradient/image, shadow, and "glassmorphism" overlay.
*   **Animation**: The selected card scales up slightly.

### 2. The "Story & Value" Section
*   **Message Input**: "Write a message to the next person..." (Auto-expanding text area with elegant typography).
*   **Value Input (Optional)**: A clean, large input for currency or token amount (e.g., "$ 5.00").
    *   *Design Note*: minimal border, large font size for the numbers.

### 3. The "Action" (Footer)
*   **Button**: "Ignite Chain" (or "Start Forwarding").
    *   **Style**: Full-width linear gradient button (Sky Blue theme).
    *   **Effect**: Subtle pulse animation to encourage action.

## Technical Components (`app/create-forward.tsx`)

### Components to Build
1.  `ForwardCardCarousel`: Reusable component for the card selection.
2.  `ForwardInput`: Custom styled input fields (cleaner than default).
3.  `GradientButton`: Reusable primary button with animation support.

### State Management
*   `selectedCard`: ID of the chosen theme.
*   `message`: User's text.
*   `amount`: Numeric value.
*   `recipient`: (Optional for v1, maybe suggest friends later).

## Verification Plan
### Manual Verification
*   Check scroll smoothness of the card carousel.
*   Verify keyboard handling (avoid covering inputs).
*   Ensure the "Ignite" button triggers the correct navigation/API call.
