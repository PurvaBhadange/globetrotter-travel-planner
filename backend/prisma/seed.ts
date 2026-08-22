import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Clear data
  await prisma.communityComment.deleteMany();
  await prisma.communityPost.deleteMany();
  await prisma.aiSuggestion.deleteMany();
  await prisma.tripExpenseSplit.deleteMany();
  await prisma.tripExpense.deleteMany();
  await prisma.tripActivity.deleteMany();
  await prisma.tripStop.deleteMany();
  await prisma.tripCollaborator.deleteMany();
  await prisma.trip.deleteMany();
  
  await prisma.activity.deleteMany();
  await prisma.city.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database cleared.");

  // Create Users
  const passwordHash = await bcrypt.hash('testpass123', 10);
  
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash,
      firstName: 'Test',
      lastName: 'User'
    }
  });

  const Alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      passwordHash,
      firstName: 'Alice',
      lastName: 'Wonderland'
    }
  });

  console.log(`Created users: ${testUser.email}, ${Alice.email}`);

  // Create Cities
  const tokyo = await prisma.city.create({
    data: {
      name: 'Tokyo',
      country: 'Japan',
      region: 'Asia',
      costIndex: 85,
      popularityScore: 99
    }
  });

  const paris = await prisma.city.create({
    data: {
      name: 'Paris',
      country: 'France',
      region: 'Europe',
      costIndex: 90,
      popularityScore: 98
    }
  });

  console.log(`Created cities: ${tokyo.name}, ${paris.name}`);

  // Create Activities
  await prisma.activity.createMany({
    data: [
      {
        cityId: tokyo.id,
        name: 'Tsukiji Outer Market',
        category: 'food',
        cost: 30,
        durationMinutes: 120,
        rating: 4.8
      },
      {
        cityId: tokyo.id,
        name: 'Tokyo Tower',
        category: 'sightseeing',
        cost: 15,
        durationMinutes: 90,
        rating: 4.5
      },
      {
        cityId: paris.id,
        name: 'Eiffel Tower',
        category: 'sightseeing',
        cost: 30,
        durationMinutes: 120,
        rating: 4.7
      },
      {
        cityId: paris.id,
        name: 'Louvre Museum',
        category: 'culture',
        cost: 20,
        durationMinutes: 240,
        rating: 4.9
      }
    ]
  });

  console.log("Created activities.");

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
