import mongoose, { Types, Schema } from 'mongoose';
import { isEmail } from 'validator';
import { compare, hash } from 'bcryptjs';
import { toJSON, /*paginate*/ } from '../../plugins';
import { ObjectId } from 'mongodb';
import config from '../../../config/config';
import fs from 'fs';
import { roles } from '../../../config/roles'
const { cloudinary } = config;
/**
 * @type {SchemaDefinitionProperty}
 */
export interface IUser {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
  isEmailVerified: boolean;
  confirmPassword?: string;
  cover: string;
  description: string;
  age: number;
  phoneNumber: string;
  gender: string;
  city: string;
  enableTimestamps?: boolean;
  views: number;
  questions: number;
  answers: number;
  points: number;
  isBanned: boolean;
  role: string;
}

export enum Gender {
  male = 'Male',
  female = 'Female',
}

export type UserInput = Pick<IUser, 'name' | 'email' | 'password' | 'confirmPassword'> & { id?: string };

export interface IUserMethods {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface UserModel extends mongoose.Model<IUser, {}, IUserMethods> {
  isEmailTaken(email: string): Promise<boolean>;
  isNameTaken(name: string): Promise<boolean>;
  uploadImage(images?: Express.Multer.File[]): Promise<string | undefined>;
}

export type UserDocument = mongoose.Document<unknown, {}, IUser> & Omit<IUser & {
  _id: Types.ObjectId;
}, "isPasswordMatch"> & IUserMethods;

export const UserSchema = new mongoose.Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    avatar: {
      type: String,
      default: ""
    },
    cover: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
    enableTimestamps: {
      type: Schema.Types.Boolean,
      default: true,
    },
    questions: {
      type: Number,
      required: true,
      default: 0,
    },
    answers: {
      type: Number,
      required: true,
      default: 0,
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    isBanned: {
      type: Schema.Types.Boolean,
      default: false,
    },
    role: {
      type: Schema.Types.String,
      enum: roles,
      default: 'user',
    }
  },
  {  
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
    
// @ts-expect-error

UserSchema.plugin(toJSON);
// userSchema.plugin(paginate);
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
UserSchema.statics.isEmailTaken = async function (email: string, excludeUserId: ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

UserSchema.statics.isNameTaken = async function (name: string, excludeUserId: ObjectId): Promise<boolean> {
  const user = await this.findOne({ name, _id: { $ne: excludeUserId } });
  return !!user;
};

UserSchema.statics.uploadImage = async function (images?: Express.Multer.File[]): Promise<string | undefined> {
  if (!images || !images[0]) return undefined;
  const image = images[0];
  const response = await cloudinary.uploader.upload(image.path, {
    folder: 'images',
  })
  fs.unlinkSync(image.path);

  return response.secure_url;
}
/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this;
  return compare(password, user.password);
};

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;
  if (user.isModified('password')) {
    user.password = await hash(user.password, 8);
  }
  next();
});

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;
  if (user.isModified('answers') || user.isModified('questions')) {
    user.points = user.answers + user.questions;
  }
  next();
});

UserSchema.pre('find', async function(next) {
  const query = this.getOptions();
  if (query.limit) {
    const newOptions = {...query, limit: query.limit + 1 };
    this.setOptions(newOptions);
  }
  next();
})

UserSchema.post('find', async function(docs: Array<UserDocument | { hasMore: boolean }>) {
  const query = this.getOptions();
  if (query.limit) {
    const hasMore = !!docs[query.limit - 1]
    if (hasMore) {
      docs.pop();
    }
    docs.push({ hasMore })
  }
})


UserSchema.pre('findOneAndUpdate', async function (next) {
  const query = this;
  const keys = Object.keys(query.getUpdate() || {});
  const updatePassword = keys.includes('password');
  if (updatePassword) {
    const newPassword = (query.getUpdate() as { password: string }).password;
    query.setUpdate({ password: await hash(newPassword, 8) });
  }
  next();
})

UserSchema.pre('findOneAndUpdate', async function (next) {
  const query = this;
  const dataToUpdate = query.getUpdate() as { cover: string, avatar: string };
  const keys = Object.keys(query.getUpdate() || {});
  if (!(keys.includes('avatar') && keys.includes('cover'))) next();

  const { cover, avatar } = dataToUpdate;
  if (cover) {
    Object.assign(dataToUpdate, { cover: cover
      .replace(/\\/g, "/") 
      .replace(/src\/public\//g, "/static/") });
  }
  if (avatar) {
    Object.assign(dataToUpdate, { avatar: avatar
      .replace(/\\/g, "/") 
      .replace(/src\/public\//g, "/static/") });
  }
  
  query.setUpdate(dataToUpdate);
  next();
})

UserSchema.pre('find', async function (next) {
  const query = this.getQuery();
  if (Object.keys(query).includes('name')) {
    this.setQuery({ ...query, name: { $regex: new RegExp(query.name, 'i')}});
  }
  next();
})


UserSchema.post('findOne', async function(result) {
  if (result) {
    result.views += 1;
    await result.save();
  }
})
/**
 * @typedef User
 */
export const User = mongoose.model<IUser, UserModel>('User', UserSchema);


