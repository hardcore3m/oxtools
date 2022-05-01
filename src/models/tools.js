import Mongoose from 'mongoose'

const schema = new Mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,

    },
    description: String,
    link: {
        type: String,
        required: [true, 'A link is required'],
        unique: true,

    },
    category:String,

}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    },
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    },
    versionKey: false,
})

const ToolsModel = Mongoose.model('Tools', schema)

export default ToolsModel