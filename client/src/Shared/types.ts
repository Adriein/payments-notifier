export type MappedActions<A> = { [K in keyof A]: A[K] extends (...args: any[]) => any ? FunctionInfer<A[K]> : never };

export type FunctionInfer<F> = F extends (...args: any[]) => infer R ? R : never;