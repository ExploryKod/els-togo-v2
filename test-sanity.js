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
    const result = await client.fetch(query);
    // Query executed successfully
  } catch (error) {
    // Error occurred during query
  }
}

testQuery();
