/**
 * Data source configuration
 * Allows switching between different data sources via environment variables
 */

export type DataSource = 'sanity' | 'supabase' | 'json';

export interface DataSourceConfig {
  source: DataSource;
}

export function getDataSourceConfig(): DataSourceConfig {
  // In production, if Sanity env vars are missing, default to JSON
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
  const hasSanityConfig = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
    (process.env.NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET);
  
  let source = (process.env.NEXT_PUBLIC_DATA_SOURCE as DataSource) || 'sanity';
  
  // If in production and no Sanity config, use JSON
  if (isProduction && !hasSanityConfig && source === 'sanity') {
    source = 'json';
  }

  return {
    source,
  };
}

