# Sanity CMS Integration for ELS Togo

## ✅ What's Been Set Up

Your website is now fully integrated with Sanity CMS! Here's what has been configured:

### 1. **Sanity Schemas Created**
- **Project Schema**: Complete project management with all fields your website needs
- **Section Schema**: For website sections with ordering
- **Member Schema**: Team member profiles with social links
- **Card Content Schema**: Content cards for various purposes
- **ELS Togo Settings**: Main website settings

### 2. **API Integration**
- Updated `/api/projects` and `/api/projects/details` to fetch from Sanity
- Automatic image URL generation for Sanity images
- Data transformation to match your existing website structure

### 3. **Project Fields Available**
- **Basic Info**: Title, Description, Category, Status
- **Content**: Goal, How We Did It, Results
- **Media**: Project Image with alt text
- **Dates**: Start Date, End Date
- **Location**: Project location
- **SEO**: Slug for URLs

## 🚀 How to Start Using Sanity

### 1. **Access Sanity Studio**
```bash
npm run dev
```
Then visit: `http://localhost:3000/studio/els-togo`

### 2. **Create Your First Project**
1. Go to "Projects" in the Sanity Studio
2. Click "Create" to add a new project
3. Fill in the required fields:
   - **Title**: Project name
   - **Slug**: URL-friendly version (auto-generated from title)
   - **Description**: Brief project overview
   - **Goal**: What was the main objective
   - **How We Did It**: Process and approach
   - **Results**: Outcomes and achievements
   - **Project Image**: Upload and add alt text
   - **Category**: Select from dropdown
   - **Status**: Planning, In Progress, Completed, On Hold
   - **Dates**: Start and end dates
   - **Location**: Where the project took place

### 3. **Publish Your Project**
- Click "Publish" to make the project live on your website
- The project will automatically appear on your website

### 4. **Manage Website Settings**
- Go to "ELS Togo Settings" to configure:
  - Website title and description
  - Footer content
  - Open Graph image for social sharing

## 🔧 Environment Variables Required

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-28
```

## 📝 Notes

- **Images**: All images are automatically optimized and served from Sanity CDN
- **Slugs**: Use lowercase, hyphen-separated values (e.g., "my-awesome-project")
- **Publishing**: Only published projects appear on your website
- **Ordering**: Projects are ordered by creation date (newest first)

## 🎯 Next Steps

1. **Create some test projects** in Sanity Studio
2. **Visit your website** to see the projects displayed
3. **Customize the project schema** if you need additional fields
4. **Set up your website settings** in the ELS Togo Settings section

Your website will now dynamically display projects from Sanity instead of static JSON files!
