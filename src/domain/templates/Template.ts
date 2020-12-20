export abstract class Template {
    protected abstract user: string;
    public abstract generate(): string;
}