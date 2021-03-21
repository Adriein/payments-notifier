import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadaDataKeys } from '../enums';

export function use(middleware: RequestHandler) {
    return function(target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(MetadaDataKeys.middleware, target, key) || [];

        Reflect.defineMetadata(MetadaDataKeys.middleware, [...middlewares, middleware], target, key);
    }
}