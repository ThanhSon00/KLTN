/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */
import mongoose, { Document, Schema, Types } from 'mongoose';

const deleteAtPath = (obj: object, path: string[], index: number) => {
  if (index === path.length - 1) {
    // @ts-expect-error
    delete obj[path[index]];
    return;
  }
  // @ts-expect-error
  deleteAtPath(obj[path[index]], path, index + 1);
};

export const toJSON = (schema: Schema) => {
  // @ts-expect-error
  let transform;
  // @ts-expect-error
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    // @ts-expect-error
    transform = schema.options.toJSON.transform;
  }
  // @ts-expect-error
  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc: Document, ret: Record<string, any>) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options?.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
        if (schema.paths[path].options?.toId) {
          ret[path] &&= ret[path].toString();
        }
      });
      if (ret._id) {
        ret.id = ret._id.toString();
      }
      delete ret._id;
      delete ret.__v;

      if (ret.enableTimestamps) {
        delete ret.enableTimestamps;
      } else {  
        delete ret.createdAt;
        delete ret.updatedAt;
      }
      
      // @ts-expect-error
      if (transform) {
        return transform(doc, ret);
      }
    },
  });
};
