const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

async function setup() {
  const targetUrl = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/event';
  const isRemote = targetUrl.includes('neon.tech') || targetUrl.includes('sslmode=require') || targetUrl.includes('render.com');

  if (!process.env.DATABASE_URL) {
    // Local flow: ensure database exists first
    try {
      const adminClient = new Client({ connectionString: 'postgres://postgres:1234@localhost:5432/postgres' });
      await adminClient.connect();
      const dbRes = await adminClient.query("SELECT 1 FROM pg_database WHERE datname = 'event'");
      if (dbRes.rows.length === 0) {
        await adminClient.query('CREATE DATABASE event');
        console.log('Database "event" created.');
      }
      await adminClient.end();
    } catch (e) {
      console.log('Note: Admin connection skipped (database may already exist).');
    }
  }

  console.log(`Connecting to database at ${targetUrl.replace(/:[^:@]+@/, ':***@')}...`);
  const clientConfig = {
    connectionString: targetUrl,
    ssl: isRemote ? { rejectUnauthorized: false } : false
  };

  const client = new Client(clientConfig);
  await client.connect();

  const migrationsDir = path.join(__dirname, '..', 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();
  for (const file of files) {
    if (file.endsWith('.sql')) {
      console.log('Applying migration:', file);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await client.query(sql);
    }
  }

  // Seed demo user if not exists
  const userCheck = await client.query("SELECT * FROM users WHERE email = 'demo@example.com'");
  if (userCheck.rows.length === 0) {
    const hash = await bcrypt.hash('demo123', 10);
    await client.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)",
      ['Demo User', 'demo@example.com', hash, 'user']
    );
    console.log('Demo user created: demo@example.com / demo123');
  }

  // Seed admin user if not exists
  const adminCheck = await client.query("SELECT * FROM admins WHERE email = 'admin@example.com'");
  if (adminCheck.rows.length === 0) {
    const hash = await bcrypt.hash('admin123', 10);
    await client.query(
      "INSERT INTO admins (name, email, password_hash) VALUES ($1, $2, $3)",
      ['Admin User', 'admin@example.com', hash]
    );
    console.log('Demo admin created: admin@example.com / admin123');
  }

  // Seed rooms if empty
  const roomCheck = await client.query('SELECT COUNT(*) FROM rooms');
  if (parseInt(roomCheck.rows[0].count) === 0) {
    await client.query(`
      INSERT INTO rooms (name, capacity, location) VALUES 
      ('Grand Ballroom', 100, 'Floor 1, West Wing'),
      ('Executive Boardroom', 16, 'Floor 3, Executive Suite'),
      ('Innovation Hub', 25, 'Floor 2, Creative Center'),
      ('Focus Room Alpha', 4, 'Floor 2, Quiet Zone'),
      ('Seminar Hall A', 50, 'Floor 1, Conference Center')
    `);
    console.log('Sample rooms seeded.');
  }

  await client.end();
  console.log('Database setup and seeding completed successfully!');
}

setup().catch(err => {
  console.error('Setup failed:', err.message || err);
  process.exit(1);
});
