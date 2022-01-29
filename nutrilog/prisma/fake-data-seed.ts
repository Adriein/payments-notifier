import { fakeData } from './data';
import { PrismaClient } from '@prisma/client'
import { ID } from "../src/Shared/Domain/VO/Id.vo";
import { CryptoService } from "../src/Shared/Domain/Services/CryptoService";
import { Password } from "../src/Shared/Domain/VO/Password.vo";
import { DateUtils } from "../src/Shared/Infrastructure/Helper/Date.utils";

const prisma = new PrismaClient()
const crypto = new CryptoService();

async function main() {
  const pricingName = [ 'monthly', 'quarterly' ];
  const admin = await prisma.user.findUnique({ where: { email: process.env.ADMIN_EMAIL! } });
  const [ role ] = await prisma.role.findMany({ where: { type: 'user' } });


  for (const data of fakeData) {
    const randomIndex = Math.floor(Math.random());
    const [ pricing ] = await prisma.pricing.findMany({ where: { pricing_name: pricingName[randomIndex] } });

    const validTo = DateUtils.add(new Date(), pricing.duration);

    const id = ID.generate().value;
    const password = await crypto.hash(Password.generate().value);


    await prisma.user.create({
      data: {
        id,
        username: data.username,
        email: data.email,
        password: password,
        owner_id: admin!.id,
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        role: {
          connect: {
            id: role!.id,
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
            pricing_id: pricing!.id,
            active: true,
            expired: false,
            warned: false,
            notified: false,
            payment_date: new Date(),
            valid_to: validTo,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })