import { User } from "../entities/User.entity";

export abstract class Template {
    protected abstract user: User;
    public abstract generate(): string;
}