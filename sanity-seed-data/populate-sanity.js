/**
 * Script to populate Sanity Studio with seed data
 * Run with: node populate-sanity.js
 * 
 * Make sure to set your SANITY_API_WRITE_TOKEN in .env.local
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-02-28',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function populateCategories() {
  try {
    const categoriesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf8')
    );
    
    console.log('Creating categories...');
    
    for (const category of categoriesData) {
      const result = await client.create(category);
      console.log(`✅ Created category: ${result.title} (${result._id})`);
    }
    
    console.log('✅ All categories created successfully!');
  } catch (error) {
    console.error('❌ Error creating categories:', error);
  }
}

async function populateMembers() {
  try {
    const membersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'members.json'), 'utf8')
    );
    
    console.log('Creating members...');
    
    for (const member of membersData) {
      const result = await client.create(member);
      console.log(`✅ Created member: ${member.firstname} ${member.name} (${result._id})`);
    }
    
    console.log('✅ All members created successfully!');
  } catch (error) {
    console.error('❌ Error creating members:', error);
  }
}

async function main() {
  console.log('🚀 Starting Sanity data population...');
  
  // Check if write token is available
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ SANITY_API_WRITE_TOKEN not found in .env.local');
    console.log('Please add your write token to .env.local file');
    return;
  }
  
  await populateCategories();
  await populateMembers();
  
  console.log('🎉 Data population completed!');
}

main().catch(console.error);
