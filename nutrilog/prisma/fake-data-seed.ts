import { fakeData } from './data';
import { PrismaClient } from '@prisma/client'
import { ID } from "../src/Shared/Domain/VO/Id.vo";
import { CryptoService } from "../src/Shared/Domain/Services/CryptoService";
import { Password } from "../src/Shared/Domain/VO/Password.vo";
import { Time } from "../src/Shared/Infrastructure/Helper/Time";
import { SUBSCRIPTION_STATUS } from "../src/Backoffice/User/Domain/constants";

const prisma = new PrismaClient()
const crypto = new CryptoService();

async function main() {
  const pricingName = [ 'monthly', 'quarterly' ];
  const fakeUserCreationDates = [ '2021-03-04', '2021-06-20', '2021-11-01' ];
  const admin = await prisma.user.findUnique({ where: { email: process.env.ADMIN_EMAIL! } });
  const [ role ] = await prisma.role.findMany({ where: { type: 'client' } });

  for (const data of fakeData) {
    const randomPricingIndex = Math.floor(Math.random() * 2);
    const randomCreationDateIndex = Math.floor(Math.random() * 3);

    const [ pricing ] = await prisma.pricing.findMany({ where: { pricing_name: pricingName[randomPricingIndex] } });
    const userCreationDate = fakeUserCreationDates[randomCreationDateIndex];

    const validTo = Time.add(new Date(userCreationDate), pricing.duration);

    const id = ID.generate().value;
    const password = await crypto.hash(Password.generate().value);

    const subscriptionId = ID.generate().value;


    await prisma.user.create({
      data: {
        id,
        username: data.username,
        email: data.email,
        password: password,
        owner_id: admin!.id,
        active: true,
        created_at: new Date(userCreationDate),
        updated_at: new Date(userCreationDate),
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
            created_at: new Date(userCreationDate),
            updated_at: new Date(userCreationDate)
          }
        },
        subscriptions: {
          create: {
            id: subscriptionId,
            pricing_id: pricing!.id,
            active: false,
            expired: true,
            payment_date: new Date(userCreationDate),
            valid_to: validTo,
            history: {
              createMany: {
                data: [
                  {
                    id: ID.generate().value,
                    event: SUBSCRIPTION_STATUS.CREATED,
                    created_at: new Date(userCreationDate),
                    updated_at: new Date(userCreationDate)
                  },
                  {
                    id: ID.generate().value,
                    event: SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE,
                    created_at: Time.add(new Date(userCreationDate), pricing.duration - 5),
                    updated_at: Time.add(new Date(userCreationDate), pricing.duration - 5),
                  },
                  {
                    id: ID.generate().value,
                    event: SUBSCRIPTION_STATUS.EXPIRED,
                    created_at: Time.add(new Date(userCreationDate), pricing.duration),
                    updated_at: Time.add(new Date(userCreationDate), pricing.duration),
                  },
                  {
                    id: ID.generate().value,
                    event: SUBSCRIPTION_STATUS.INACTIVE,
                    created_at: Time.add(new Date(userCreationDate), pricing.duration),
                    updated_at: Time.add(new Date(userCreationDate), pricing.duration),
                  }
                ]
              }
            },
            created_at: new Date(userCreationDate),
            updated_at: new Date(userCreationDate)
          }
        }
      }
    });

    const daysBetweenFirstDateAndNow = Time.diff(Time.now(), new Date(userCreationDate));

    const numberOfSubscriptions = Math.floor((daysBetweenFirstDateAndNow / pricing.duration));

    let fakeNow = Time.add(validTo, 1);

    for (let i = 0; i < numberOfSubscriptions; i++) {
      const subscriptionExpirationDate = Time.add(new Date(fakeNow), pricing.duration);

      if (Time.before(Time.now(), subscriptionExpirationDate)) {
        await prisma.subscription.create({
          data: {
            id: ID.generate().value,
            pricing_id: pricing!.id,
            active: true,
            expired: false,
            user_id: id,
            payment_date: fakeNow,
            valid_to: subscriptionExpirationDate,
            history: {
              createMany: {
                data: [
                  {
                    id: ID.generate().value,
                    event: SUBSCRIPTION_STATUS.CREATED,
                    created_at: fakeNow,
                    updated_at: fakeNow
                  }
                ]
              }
            },
            created_at: fakeNow,
            updated_at: fakeNow,
          }
        });

        break;
      }

      await prisma.subscription.create({
        data: {
          id: ID.generate().value,
          pricing_id: pricing!.id,
          active: false,
          expired: true,
          user_id: id,
          payment_date: fakeNow,
          valid_to: subscriptionExpirationDate,
          history: {
            createMany: {
              data: [
                {
                  id: ID.generate().value,
                  event: SUBSCRIPTION_STATUS.CREATED,
                  created_at: fakeNow,
                  updated_at: fakeNow
                },
                {
                  id: ID.generate().value,
                  event: SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE,
                  created_at: Time.add(fakeNow, pricing.duration - 5),
                  updated_at: Time.add(fakeNow, pricing.duration - 5),
                },
                {
                  id: ID.generate().value,
                  event: SUBSCRIPTION_STATUS.EXPIRED,
                  created_at: Time.add(fakeNow, pricing.duration),
                  updated_at: Time.add(fakeNow, pricing.duration),
                },
                {
                  id: ID.generate().value,
                  event: SUBSCRIPTION_STATUS.INACTIVE,
                  created_at: Time.add(fakeNow, pricing.duration),
                  updated_at: Time.add(fakeNow, pricing.duration),
                }
              ]
            }
          },
          created_at: fakeNow,
          updated_at: fakeNow,
        }
      });

      fakeNow = Time.add(subscriptionExpirationDate, 1);
    }
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