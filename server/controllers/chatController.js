const Chat = require('../models/Chat')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const io = require('../socket')


//when clicked on user
exports.createChat = catchAsync(async (req,res,next) =>{
        let chat;
        chat = await Chat.findOne(
        { user: { $all: [req.user._id, req.body.user] }}).populate('chat.postedBy','name') 
    
        if(!chat)
            chat = await Chat.create({
                user: [req.user._id,req.body.user]
        }); 
            
    
        res.status(200).json(chat);
    })

    //get chat you have chated with _id used in addToChat
    exports.getAllChats= catchAsync(async (req,res,next) =>{
        const chat = await Chat.find({ user: { $in: [req.user._id] } }).populate('user','name photo')
        
        if(!chat)
            return next(new AppError('YOU HAVE NO CHAT YET WITH THE USER PLEASE INITIALIZE', 404));
    
        
            // chat = {...chat, user: chat.user.filter(user._id !== req.user._id )}
        res.status(200).json(chat);


    })


    exports.addToChat = catchAsync(async (req,res,next)=> {
        const chat =await Chat.findByIdAndUpdate(req.body.chatId, {$push: {message: req.body.message}},{ new: true }).populate('chat.postedBy','name')
        if(!chat)
            return next(new AppError('No document found with that ID', 404));

        
    io.getIO().emit(req.body.chatId,{action:'newmessage', chat:chat})
  
      
        res.status(200).json(chat);
  })
