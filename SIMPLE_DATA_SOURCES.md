# ✅ Simple Data Source Switching

## 🎯 What This Does

You can now choose between **Sanity CMS** or **JSON files** using a single environment variable. **No fallback system** - if the selected source has no data, it returns empty results.

## 🔧 Environment Configuration

### **Option 1: Use Sanity CMS (Default)**
```env
NEXT_PUBLIC_DATA_SOURCE=sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-28
```

### **Option 2: Use JSON Files**
```env
NEXT_PUBLIC_DATA_SOURCE=json
ROOT_DEV=http://localhost:3000
ROOT_PATH=https://your-production-domain.com
```

## 🚀 How to Use

### **1. Set Environment Variable**
Create `.env.local` with one of the configurations above.

### **2. Use pnpm Commands**
```bash
# Development
pnpm dev

# Build
pnpm build

# Sanity Studio (if using Sanity)
pnpm sanity:studio
```

### **3. Switch Data Sources**
Change `NEXT_PUBLIC_DATA_SOURCE` and restart your server:

```bash
# Use Sanity
NEXT_PUBLIC_DATA_SOURCE=sanity pnpm dev

# Use JSON
NEXT_PUBLIC_DATA_SOURCE=json pnpm dev
```

## 📊 Behavior

### **With Sanity (`NEXT_PUBLIC_DATA_SOURCE=sanity`)**
- ✅ Fetches projects from Sanity CMS
- ✅ Returns empty array `[]` if no projects in Sanity
- ✅ No fallback to JSON

### **With JSON (`NEXT_PUBLIC_DATA_SOURCE=json`)**
- ✅ Fetches projects from `project.json` file
- ✅ Returns projects from JSON file
- ✅ No fallback to Sanity

## 🎯 Use Cases

### **Development**
```env
NEXT_PUBLIC_DATA_SOURCE=json
```
- Fast development with static data
- No external dependencies

### **Production with Content Management**
```env
NEXT_PUBLIC_DATA_SOURCE=sanity
```
- Rich content management
- Easy editing for non-technical users
- Image optimization

### **Production with Static Content**
```env
NEXT_PUBLIC_DATA_SOURCE=json
```
- Simple static deployment
- No external services

## 🔍 Testing

### **Test Sanity Source**
```bash
NEXT_PUBLIC_DATA_SOURCE=sanity pnpm dev
curl http://localhost:3000/api/projects/details
# Returns: [] (empty if no projects in Sanity)
```

### **Test JSON Source**
```bash
NEXT_PUBLIC_DATA_SOURCE=json pnpm dev
curl http://localhost:3000/api/projects/details
# Returns: [array of projects from JSON]
```

## ✅ Result

- **Simple switching** between data sources
- **No fallback complexity** - what you choose is what you get
- **Empty results** when selected source has no data
- **Clean and predictable** behavior

Your website now has a simple, reliable data source system that does exactly what you want!
