import mongoose, { Schema, Document } from "mongoose";

export interface ICity extends Document {
  cityid: string;
  cityname: string;
  state: string;
  statecode: string;
}

const CitySchema: Schema = new Schema({
  cityid: {
    type: String,
    required: true,
    unique: true,
  },
  cityname: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  statecode: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ICity>("City", CitySchema);
