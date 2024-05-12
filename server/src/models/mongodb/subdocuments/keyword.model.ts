import mongoose, { Decimal128, Schema, Types } from "mongoose";
import { toJSON } from "../../plugins";
import { Question } from "../documents";
import autoPopulate from "mongoose-autopopulate";

export interface IKeyword {
    word: string;
    tf_idf: mongoose.mongo.BSON.Decimal128;
}

export interface IKeyWordMethods {
    //methods
}

export interface KeywordModel extends mongoose.Model<IKeyword, {}, IKeyWordMethods> {
    // static methods
}

export type KeywordDocument = mongoose.Document<unknown, {}, IKeyword> & Omit<IKeyword & {
    _id: Types.ObjectId;
  }, ""> & IKeyWordMethods;
  
export const KeywordSchema = new mongoose.Schema<IKeyword, KeywordModel>(
    {
        word: {
            type: Schema.Types.String,
            required: true,
        },
        tf_idf: {
            type: Schema.Types.Decimal128,
            required: true,
            default: 0,
        },
    }, {
        timestamps: false,
    }
);

KeywordSchema.plugin(toJSON);
KeywordSchema.plugin(autoPopulate);
