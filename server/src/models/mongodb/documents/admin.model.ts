import mongoose, { Types, Schema } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { toJSON, /*paginate*/ } from '../../plugins';

/**
 * @type {SchemaDefinitionProperty}
 */
export interface IAdmin {
  name: string;
  avatar: string;
  password: string;
}

export interface IAdminMethods {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface AdminModel extends mongoose.Model<IAdmin, {}, IAdminMethods> {
    // static methods
}

export type AdminDocument = mongoose.Document<unknown, {}, IAdmin> & Omit<IAdmin & {
  _id: Types.ObjectId;
}, "isPasswordMatch"> & IAdminMethods;

export const AdminSchema = new mongoose.Schema<IAdmin, AdminModel>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
      type: String,
      default: ""
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
  },
  {  
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
    
AdminSchema.plugin(toJSON);
// userSchema.plugin(paginate);
AdminSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this;
  return compare(password, user.password);
};

export const Admin = mongoose.model<IAdmin, AdminModel>('Admin', AdminSchema);


