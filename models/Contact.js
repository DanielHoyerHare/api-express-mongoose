import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: 3,
        trim: true,
        validate: {
            validator: function(value){
                const regex = /^[a-zA-ZæøåÆØÅ]*$/;
                return regex.test(value);
            },
            message: "First name cannot contain special characters or numbers"
        }
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: 3,
        trim: true,
        validate: {
            validator: function(value){
                const regex = /^[a-zA-ZæøåÆØÅ]*$/;
                return regex.test(value);
            },
            message: "First name cannot contain special characters or numbers"
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minLength: 3,
        unique: true,
        validate: {
            validator: function(value){
                const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(value);
            },
            message: "Provided email is not valid"
        }
    },
    age: {
        type: Number,
        reuired: false
    }
})

const model = mongoose.model("Contact", contactSchema);

export const schema = model.schema;
export default model;