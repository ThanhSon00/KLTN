import mongoose, { Types, SchemaOptions } from 'mongoose';
import { isEmail } from 'validator';
import { compare, hash } from 'bcryptjs';
import { toJSON, /*paginate*/ } from '../../plugins';
import { ObjectId } from 'mongodb';
/**
 * @type {SchemaDefinitionProperty}
 */
export interface IUser {
  name: string;
  email: string;
  avatar: string;
  password: string;
  isEmailVerified: boolean;
  confirmPassword?: string;
}

export type UserInput = Omit<IUser, 'avatar' | 'isEmailVerified'> & { id?: string };

export interface IUserMethods {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface UserModel extends mongoose.Model<IUser, {}, IUserMethods> {
  isEmailTaken(email: string): Promise<boolean>;
  isNameTaken(name: string): Promise<boolean>;
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
      required: true,
      default: '/images/anonymous-avatar.png'
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

/**
 * @typedef User
 */
export const User = mongoose.model<IUser, UserModel>('User', UserSchema);


