# Flexible Data Sources System

This system allows you to switch between different data sources (Sanity, Supabase, JSON) using environment variables with automatic fallback support.

## 🚀 Quick Start

### 1. Environment Variables

Create a `.env.local` file with the following configuration:

```env
# Data Source Configuration
# Options: 'sanity', 'supabase', 'json'
NEXT_PUBLIC_DATA_SOURCE=sanity

# Fallback Configuration
NEXT_PUBLIC_ENABLE_FALLBACK=true
NEXT_PUBLIC_FALLBACK_SOURCE=json

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-28

# Supabase Configuration (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# JSON File Configuration (if using JSON fallback)
ROOT_DEV=http://localhost:3000
ROOT_PATH=https://your-production-domain.com

# Development Mode
NEXT_PUBLIC_MOD=development
```

### 2. Using pnpm Commands

```bash
# Install dependencies
pnpm install

# Development with type generation
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Sanity Studio commands
pnpm sanity:studio    # Start Sanity Studio
pnpm sanity:build     # Build Sanity Studio
pnpm sanity:deploy    # Deploy Sanity Studio

# Type generation
pnpm typegen
```

## 🔧 Data Source Configuration

### Primary Data Source

Set `NEXT_PUBLIC_DATA_SOURCE` to choose your primary data source:

- **`sanity`**: Use Sanity CMS (recommended)
- **`supabase`**: Use Supabase database
- **`json`**: Use static JSON files

### Fallback System

When `NEXT_PUBLIC_ENABLE_FALLBACK=true`, the system will automatically fallback to the secondary data source if the primary fails.

Example scenarios:
- Primary: Sanity (fails) → Fallback: JSON files
- Primary: Supabase (fails) → Fallback: Sanity
- Primary: JSON (fails) → Fallback: Sanity

## 📊 Data Source Implementations

### 1. Sanity CMS (Recommended)
- **Pros**: Rich content management, image optimization, real-time editing
- **Cons**: Requires Sanity setup
- **Best for**: Content-heavy websites, non-technical editors

### 2. Supabase
- **Pros**: Real-time database, authentication, easy setup
- **Cons**: Requires database schema setup
- **Best for**: Dynamic data, user-generated content

### 3. JSON Files
- **Pros**: Simple, no external dependencies
- **Cons**: Manual editing, no real-time updates
- **Best for**: Static content, development/testing

## 🔄 Switching Data Sources

### Method 1: Environment Variables
```env
# Switch to Supabase
NEXT_PUBLIC_DATA_SOURCE=supabase
NEXT_PUBLIC_FALLBACK_SOURCE=sanity

# Switch to JSON with Sanity fallback
NEXT_PUBLIC_DATA_SOURCE=json
NEXT_PUBLIC_FALLBACK_SOURCE=sanity
```

### Method 2: Runtime Configuration
You can also modify the configuration in `lib/config/dataSource.ts` for more complex scenarios.

## 🛠️ Adding New Data Sources

To add a new data source:

1. **Create a new data source class** in `lib/dataSources/projectDataSource.ts`:

```typescript
class NewDataSource implements ProjectDataSource {
  async fetchProjects(): Promise<Project[]> {
    // Implementation
  }
  
  async fetchProjectBySlug(slug: string): Promise<Project | null> {
    // Implementation
  }
}
```

2. **Add it to the factory**:

```typescript
static create(source: DataSource): ProjectDataSource {
  switch (source) {
    case 'sanity':
      return new SanityProjectDataSource();
    case 'supabase':
      return new SupabaseProjectDataSource();
    case 'json':
      return new JsonProjectDataSource();
    case 'new-source':  // Add this
      return new NewDataSource();
    default:
      throw new Error(`Unknown data source: ${source}`);
  }
}
```

3. **Update the DataSource type** in `lib/config/dataSource.ts`:

```typescript
export type DataSource = 'sanity' | 'supabase' | 'json' | 'new-source';
```

## 🧪 Testing

### Test Different Data Sources

```bash
# Test with Sanity
NEXT_PUBLIC_DATA_SOURCE=sanity pnpm dev

# Test with JSON fallback
NEXT_PUBLIC_DATA_SOURCE=sanity NEXT_PUBLIC_FALLBACK_SOURCE=json pnpm dev

# Test with Supabase
NEXT_PUBLIC_DATA_SOURCE=supabase pnpm dev
```

### API Endpoints

- **`/api/projects`**: Get all projects (for front page)
- **`/api/projects/details`**: Get all projects with full details

Both endpoints automatically use the configured data source with fallback.

## 🚨 Error Handling

The system includes comprehensive error handling:

1. **Primary source fails**: Automatically tries fallback
2. **All sources fail**: Returns 500 error with details
3. **Logging**: All errors are logged for debugging

## 📝 Best Practices

1. **Always enable fallback** in production
2. **Use Sanity as primary** for content management
3. **Keep JSON files updated** as backup
4. **Test all data sources** before deployment
5. **Monitor logs** for data source failures

## 🔍 Debugging

Check the console logs for data source information:

```
✅ Using primary data source: sanity
⚠️  Primary data source failed, falling back to: json
❌ All data sources failed
```

## 🎯 Use Cases

### Development
- Primary: JSON (fast, no external dependencies)
- Fallback: Sanity (for testing)

### Staging
- Primary: Sanity (test content)
- Fallback: JSON (backup)

### Production
- Primary: Sanity (live content)
- Fallback: JSON (emergency backup)

This flexible system ensures your website always has data available, regardless of external service issues!
