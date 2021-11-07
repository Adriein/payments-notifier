import { PrismaClient } from '@prisma/client'
import { ID } from "../src/Shared/Domain/VO/Id.vo";

const prisma = new PrismaClient()

async function main() {
  const pricing = await prisma.pricing.findMany({
    where: {
      OR: [
        {
          pricing_name: 'yearly'
        },
        {
          pricing_name: 'quarterly'
        },
        {
          pricing_name: 'monthly'
        },
      ],
    },
  });

  if (pricing.length > 0) {
    throw new Error('No seeding needed');
  }

  const yearly = await prisma.pricing.create({
    data: {
      id: ID.generate().value,
      pricing_name: 'yearly',
      amount: 1000,
      duration: 365,
      created_at: new Date(),
      updated_at: new Date(),
    }
  });

  const quarterly = await prisma.pricing.create({
    data: {
      id: ID.generate().value,
      pricing_name: 'quarterly',
      amount: 150,
      duration: 90,
      created_at: new Date(),
      updated_at: new Date(),
    }
  });

  const monthly = await prisma.pricing.create({
    data: {
      id: ID.generate().value,
      pricing_name: 'monthly',
      amount: 50,
      duration: 30,
      created_at: new Date(),
      updated_at: new Date(),
    }
  });

  const userRole = await prisma.role.create({
    data: {
      id: ID.generate().value,
      type: 'user',
      created_at: new Date(),
      updated_at: new Date(),
    }
  });

  const adminRole = await prisma.role.create({
    data: {
      id: ID.generate().value,
      type: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    }
  });

  console.log({ yearly, quarterly, monthly, adminRole, userRole })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })