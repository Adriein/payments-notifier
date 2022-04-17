import { ClientRepositoryFilter } from "../../Domain/Filter/ClientRepositoryFilter";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { Model } from "../../../../Shared/Domain/Entities/Model";
import { Attributes } from "../../../../Shared/Domain/Entities/Attributes";
import { PrismaQueryBuilder } from "../../../../Shared/Infrastructure/Data/PrismaQueryBuilder";
import { Prisma } from "@prisma/client";
import { PrismaOrderBy, PrismaPagination } from "../../../../Shared/Infrastructure/types";

interface PrismaClientFilterProps {
  owner_id?: string;
  username?: string;
  email?: string;
  active?: boolean
  'role.type'?: string
  'pricing.pricing_name'?: string;
  'pricing.duration'?: number;
  'pricing.amount'?: number;
  'subscription.active'?: boolean;
  'subscription.expired'?: boolean;
  'subscription.valid_to'?: Date;
  'subscription.payment_date'?: Date;
  'config.send_notifications'?: boolean;
  'config.send_warnings'?: boolean;
  'config.language'?: string;
  page?: number;
  quantity?: number;
}

export class PrismaClientFilter extends Model<Prisma.userWhereInput> implements ClientRepositoryFilter {
  private where!: Prisma.userWhereInput;

  constructor(private readonly queryBuilder: PrismaQueryBuilder<Prisma.userWhereInput>) {
    super(new Attributes<PrismaClientFilterProps>({}));
  }


  public apply(): Prisma.userWhereInput {
    return this.queryBuilder.build(this.getAll());
  }

  public pagination(): PrismaPagination | {} {
    if (this.get('page') && this.get('quantity')) {
      return {
        take: this.get('quantity')!,
        skip: (this.get('page')! - 1) * this.get('quantity')!
      }
    }

    return {};
  }

  public orderBy(): PrismaOrderBy | {} {
    return {};
  }

  public acceptReceiveNotifications(notifications: boolean): this {
    this.set({ config: { send_notifications: notifications } });
    return this;
  }

  public acceptReceiveWarnings(warnings: boolean): this {
    this.set({ config: { send_warnings: warnings } })
    return this;
  }

  public hasPricingOfType(pricingName: string): this {
    this.set({ "pricing.pricing_name": pricingName });
    return this;
  }

  public hasPricingWithCostOf(pricingAmount: number): this {
    this.set({ "pricing.amount": pricingAmount });
    return this;
  }

  public hasPricingWithDurationOf(duration: number): this {
    this.set({ "pricing.duration": duration });
    return this;
  }

  public isActive(isActive: boolean): this {
    this.set({ "active": isActive });
    return this;
  }

  public setPage(page: number): this {
    this.set({ page });
    return this;
  }

  public setQuantity(quantity: number): this {
    this.set({ quantity });
    return this;
  }

  public withActiveSubscription(activeSubscription: boolean): this {
    this.set({ "subscription.active": activeSubscription });
    return this;
  }

  public withEmail(email: Email): this {
    this.set({ email: email.value });
    return this;
  }

  public withName(name: string): this {
    this.set({ username: name });
    return this;
  }

  public withRole(roleName: string): this {
    this.set({ "role.type": roleName });
    return this;
  }

  public withSubscriptionExpired(expired: boolean): this {
    this.set({ "subscription.expired": expired });
    return this;
  }

  public withSubscriptionPaymentDate(paymentDate: DateVo): this {
    this.set({ "subscription.payment_date": paymentDate.value });
    return this;
  }

  public withSubscriptionValidTo(validTo: DateVo): this {
    this.set({ "subscription.valid_to": validTo.value });
    return this;
  }

  public withTenant(id: ID): this {
    this.set({ owner_id: id.value });
    return this;
  }
}