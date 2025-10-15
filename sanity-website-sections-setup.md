# Website Sections Setup in Sanity Studio

## Overview
All website section texts are now managed through Sanity Studio. You can edit all section content from a single "Website Sections" document.

## Schema Configuration
The `websiteSections` schema includes the following sections:

### 🏠 **Hero Section**
- **Pre-title**: Small text above main title (e.g., "Association ELS - Togo")
- **Main Title**: The main headline
- **Description Text**: Main description paragraph
- **Call-to-Action Button**: URL and button text

### 📋 **Project Section**
- **Pre-title**: Small text above content (e.g., "Nos projets")
- **Description Text**: Description for the project section

### 🎯 **Mission Section**
- **Pre-title**: Small text above content (e.g., "Notre Mission & nos valeurs")
- **Description Text**: Description for the mission section

### 👥 **Team Section**
- **Pre-title**: Small text above main title (e.g., "Notre équipe")
- **Main Title**: The main headline for team section
- **Description Text**: Description for the team section

### 📞 **Contact Section**
- **Main Title**: The main headline (e.g., "Nous contacter")
- **Description Text**: Description for the contact section

### 📍 **Contact Information**
- **Address**: Physical address
- **Opening Hours**: Business hours
- **Phone Number**: Contact phone with country code
- **Email Address**: Contact email

## How to Edit Website Sections

1. **Open Sanity Studio**: Run `pnpm run sanity:dev` or access your deployed studio
2. **Navigate to Website Sections**: Look for "Website Sections" in the main navigation (it appears as a singleton, not in a list)
3. **Edit the Document**: Click directly on "Website Sections" - there's only one instance
4. **Fill in the fields** for each section you want to customize
5. **Save**: Click "Publish" to make changes visible

**Note**: Website Sections is a **singleton** - there's only one instance for the entire website, just like settings. You cannot create multiple website sections documents.

## Section Structure

Each section is organized as follows:

```typescript
// Hero Section
heroSection: {
  pretitle: "Association ELS - Togo",
  title: "Nous promouvons l'éducation, les loisirs et la santé",
  text: "Description text...",
  buttonData: {
    url: "#contact",
    text: "S'engager avec nous"
  }
}

// Other sections follow similar patterns
```

## Data Source Configuration
The system will automatically use Sanity data when `NEXT_PUBLIC_DATA_SOURCE=sanity` is set in your environment variables.

## Import Seed Data (Optional)
If you want to import the default sections, you can use:
```bash
pnpm run sanity:import --path public/website-sections.ndjson
```

## Fallback Behavior
- If no website sections are found in Sanity, the system will use built-in fallback content
- If Sanity is not configured, it will use the JSON fallback (if available)
- All sections have sensible defaults to ensure the website always displays content

## Field Validation
- **Required fields**: Contact section title and text, contact info fields
- **Character limits**: Titles (200 chars), descriptions (300-500 chars), buttons (50 chars)
- **Email validation**: Contact email must be a valid email format
- **URL validation**: Button URLs are validated

## Content Guidelines

### **Hero Section**
- Keep the pre-title short and impactful
- Main title should be clear and compelling
- Description should be 2-3 sentences maximum
- Button text should be action-oriented

### **Project Section**
- Pre-title should introduce the projects
- Description should explain what visitors will find

### **Mission Section**
- Pre-title should introduce values/mission
- Description should explain your core beliefs

### **Team Section**
- Pre-title should introduce the team
- Main title should be welcoming
- Description should explain your team's commitment

### **Contact Section**
- Title should be clear and inviting
- Description should encourage engagement
- Contact info should be accurate and up-to-date

## Benefits

- **🎯 Centralized Management**: All section content in one place
- **🔄 Real-time Updates**: Changes appear immediately on the website
- **📱 Responsive Content**: Content adapts to different screen sizes
- **🌐 Multi-language Ready**: Easy to extend for multiple languages
- **⚡ Performance**: Optimized data fetching and caching
- **🛡️ Error Handling**: Graceful fallbacks ensure website always works

## Troubleshooting

### **Content Not Updating**
- Check if the document is published in Sanity
- Verify `NEXT_PUBLIC_DATA_SOURCE=sanity` is set
- Clear browser cache and refresh

### **Missing Sections**
- Ensure all required fields are filled
- Check the API endpoint `/api/website-sections`
- Verify Sanity connection is working

### **Formatting Issues**
- Check character limits for each field
- Ensure proper line breaks in text fields
- Validate email and URL formats

The website sections are now **fully integrated** with Sanity Studio and ready for content management! 🎉
