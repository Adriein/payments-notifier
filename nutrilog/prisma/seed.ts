import { PrismaClient } from '@prisma/client'
import { ID } from "../src/Shared/Domain/VO/Id.vo";
import { CryptoService } from "../src/Shared/Domain/Services/CryptoService";
import { Time } from "../src/Shared/Infrastructure/Helper/Time";

const prisma = new PrismaClient()
const crypto = new CryptoService();

async function main() {
  const id = ID.generate().value;
  const password = await crypto.hash(process.env.ADMIN_PASSWORD!);

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

  const clientRole = await prisma.role.create({
    data: {
      id: ID.generate().value,
      type: 'client',
      created_at: new Date(),
      updated_at: new Date(),
    }
  });

  const tenantRole = await prisma.role.create({
    data: {
      id: ID.generate().value,
      type: 'tenant',
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

  const monthly = await prisma.pricing.create({
    data: {
      id: ID.generate().value,
      pricing_name: 'monthly',
      amount: 50,
      duration: 30,
      user_id: id,
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
      user_id: id,
      created_at: new Date(),
      updated_at: new Date(),
    }
  });

  const validTo = Time.add(new Date(), 365);

  const user = await prisma.user.create({
    data: {
      id,
      username: 'Adria Claret',
      email: process.env.ADMIN_EMAIL!,
      password: password,
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
          payment_date: new Date(),
          valid_to: validTo,
          created_at: new Date(),
          updated_at: new Date()
        }
      }
    }
  });

  const ENTITIES: Record<string, { field: string, type: string }[]> = {
    user: [
      { field: 'active', type: 'boolean' }
    ],
    subscription: [
      { field: 'payment_date', type: 'date' },
      { field: 'valid_to', type: 'date' },
      { field: 'active', type: 'boolean' },
      { field: 'expired', type: 'boolean' },
    ],
    config: [
      { field: 'language', type: 'string' },
      { field: 'send_notifications', type: 'boolean' },
      { field: 'send_warnings', type: 'boolean' },
    ],
    pricing: [
      { field: 'pricing_name', type: 'string' },
      { field: 'duration', type: 'number' },
      { field: 'amount', type: 'number' },
    ],

  }

  for (const entity in ENTITIES) {
    for (const detail of ENTITIES[entity]) {
      await prisma.app_filter.create(
        {
          data: {
            id: ID.generate().value,
            entity: entity,
            field: detail.field,
            type: detail.type,
            tenant_id: id,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
      );
    }

  }

  console.log({ yearly, monthly, quarterly, adminRole, clientRole, tenantRole, user })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })