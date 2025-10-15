# Mission Cards Setup in Sanity Studio

## Overview
Mission cards are now configured to work with Sanity Studio. You can manage them through the Sanity Studio interface.

## Schema Configuration
The `missionCard` schema includes the following fields:
- **Title**: The card title (e.g., "Dignité", "Amour")
- **Description**: The card description text
- **Icon Image**: Optional image/icon for the card
- **Display Order**: Number to control the order of cards (lower numbers appear first)

## How to Add Mission Cards

1. **Open Sanity Studio**: Run `pnpm run sanity:dev` or access your deployed studio
2. **Navigate to Mission Cards**: Look for "Mission Card" in the content types
3. **Create New Card**: Click "Create" and select "Mission Card"
4. **Fill in the fields**:
   - **Title**: Enter the card title (e.g., "Dignité")
   - **Description**: Enter the description text
   - **Icon Image**: Upload an image or leave empty to use the default
   - **Display Order**: Set a number (1, 2, 3, etc.) to control the order
5. **Save**: Click "Publish" to make the card visible

## Default Cards
The system includes 4 default mission cards:
1. **Dignité** - Order: 1
2. **Amour** - Order: 2  
3. **Franchise** - Order: 3
4. **Partage** - Order: 4

## Data Source Configuration
The system will automatically use Sanity data when `NEXT_PUBLIC_DATA_SOURCE=sanity` is set in your environment variables.

## Import Seed Data (Optional)
If you want to import the default cards, you can use:
```bash
pnpm run sanity:import --path public/mission-cards.ndjson
```

## Fallback Behavior
- If no mission cards are found in Sanity, the system will fall back to the hardcoded cards in the component
- If Sanity is not configured, it will use the JSON fallback (if available)

## Image Handling
- Images are automatically optimized and served through Sanity's CDN
- If no image is provided, a default icon will be used
- Images are displayed in circular containers with hover effects
