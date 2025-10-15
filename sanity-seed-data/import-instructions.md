# Sanity Studio Data Import Instructions

## Method 1: Manual Import via Sanity Studio

### Categories
1. Go to your Sanity Studio
2. Navigate to "Project Category" section
3. Click "Create" for each category
4. Copy the data from `categories.json` into each new category

### Members  
1. Go to "Team Member" section
2. Click "Create" for each member
3. Copy the data from `members.json` into each new member
4. Upload profile images as needed

## Method 2: Using Sanity CLI (Advanced)

```bash
# Install Sanity CLI if not already installed
npm install -g @sanity/cli

# Import categories
sanity dataset import categories.json production --replace

# Import members  
sanity dataset import members.json production --replace
```

## Method 3: Using Sanity API (Programmatic)

Create a script to import data programmatically using the Sanity API with your write token.

## Notes
- Make sure to upload images separately in Sanity Studio
- Adjust email addresses and phone numbers as needed
- Categories will be available for selection in projects once created
