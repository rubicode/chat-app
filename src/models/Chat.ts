import mongoose, { Schema } from 'mongoose';

const chatSchema = new Schema({
    content: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.models.Chat || mongoose.model('Chat', chatSchema);