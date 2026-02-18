import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitMilestone, getMilestone } from '../../../controllers/courseController';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';
import { unlockNext } from '../../../controllers/courseController';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    CustomButton,
    Textarea
} from '../../../elements';

import UserAvatar from "../../../assets/image/avatar/avatar5.jfif";

function StartingStatement() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [comment, setComment] = useState<string>("");
    const [buttonDisabledStatus, setbuttonDisabledStatus] = useState<boolean>(true);

    useEffect(() => {
        if (user) {
            const getComment = async () => {
                const result = await getMilestone('milestone0_2');
                if (result) {
                    setComment(result.responses.statement as string);
                    setbuttonDisabledStatus(false);
                }
            }
            getComment();
        }
    }, [user])

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone1/1", prevMilestoneId: "milestone0/2" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone1/1');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone0/1');
    }
    const handlePostComment = async () => {
        if (!user) {
            toast.error("You need to login to post a comment.");
        } else {
            if (comment.trim()) {
                try {
                    const result = await submitMilestone('milestone0_2', { userId: user?.uid, responses: { statement: comment } });
                    setbuttonDisabledStatus(false);
                    toast.success(result.message);
                } catch (error: any) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }
    };

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center">
                <div className="font-bold">
                    <h3>Your Starting Statement</h3>
                </div>
            </div>
            <div className="flex flex-col items-center text-center">
                <div className="text-ib-5 font-bold">
                    <h5>Before we begin the Milestones, reflect on where you are now.</h5>
                    <p className="text-[#13930C]">You're not just on this journey—you are the journey. And oh, what adventure lies ahead!</p>
                </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-xl">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={UserAvatar} alt="user-avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                    <Textarea
                        placeholder="Add your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={5}
                        className="resize-none text-gray-800 bg-white border-gray-500"
                    />

                    <div className="flex justify-end items-center">
                        {/* <div className="flex space-x-3 text-gray-800">
                            <Paperclip className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" />
                            <Smile className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" />
                        </div> */}

                        <CustomButton onClickFunc={handlePostComment} title='Post' className='rounded-full justify-end h-auto' type='red' disabled={!comment.trim()}></CustomButton>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={buttonDisabledStatus}></CustomButton>
            </div>
        </div>
    )
}

export default StartingStatement