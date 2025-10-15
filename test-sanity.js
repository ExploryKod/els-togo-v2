import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ds7w4i35',
  dataset: 'production',
  apiVersion: '2024-02-28',
  useCdn: false,
});

const query = `*[_type == "websiteSections"][0] {
  _id,
  heroSection,
  projectSection,
  missionSection,
  teamSection,
  contactSection,
  contactInfo
}`;

async function testQuery() {
  try {
    console.log('Testing Sanity query...');
    const result = await client.fetch(query);
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testQuery();
