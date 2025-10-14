/**
 * Data source configuration
 * Allows switching between different data sources via environment variables
 */

export type DataSource = 'sanity' | 'supabase' | 'json';

export interface DataSourceConfig {
  source: DataSource;
}

export function getDataSourceConfig(): DataSourceConfig {
  const source = (process.env.NEXT_PUBLIC_DATA_SOURCE as DataSource) || 'sanity';

  console.log('🔧 Data Source Configuration:', {
    source,
    env: {
      NEXT_PUBLIC_DATA_SOURCE: process.env.NEXT_PUBLIC_DATA_SOURCE,
    }
  });

  return {
    source,
  };
}

