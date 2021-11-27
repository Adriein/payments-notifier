import { PrismaClient } from '@prisma/client'
import { ID } from "../nutrilog/src/Shared/Domain/VO/Id.vo";

const prisma = new PrismaClient()

async function main() {
  const id = ID.generate().value;

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

  const yearly = await prisma.pricing.create({
    data: {
      id: ID.generate().value,
      pricing_name: 'yearly',
      amount: 1000,
      duration: 365,
      user_id: id,
      created_at: new Date(),
      updated_at: new Date(),
    }
  });


  const user = await prisma.user.create({
    data: {
      id,
      username: 'Adria Claret',
      email: process.env.ADMIN_EMAIL!,
      password: '',
      owner_id: id,
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
      role: {
        connect: {
          id: adminRole.id,
        }
      },
      config: {
        create: {
          id: ID.generate().value,
          send_warnings: true,
          send_notifications: true,
          language: 'ES',
          created_at: new Date(),
          updated_at: new Date()
        }
      },
      subscriptions: {
        create: {
          id: ID.generate().value,
          pricing_id: yearly.id,
          active: true,
          expired: false,
          warned: false,
          notified: false,
          payment_date: new Date(),
          created_at: new Date(),
          updated_at: new Date()
        }
      }
    }
  });

  console.log({ yearly, adminRole, userRole, user })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })