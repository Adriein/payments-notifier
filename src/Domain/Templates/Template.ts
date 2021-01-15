import { User } from "../Entities/User.entity";

export abstract class Template {
    protected abstract user: User;
    public abstract generate(): string;
}