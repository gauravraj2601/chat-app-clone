import React from "react";
import Image from "next/image";
import avatar from "../../assets/Frame 10.png";
import { useAuth } from "../../app/auth-provider";
import { getSender } from "../config/ChatLogin";
const MessageBox = ({ chats }) => {
  const { auth, selectedChat, setSelectedChat, user } = useAuth();

  return (
    <>
      {chats &&
        chats?.map((eachChat, index) => (
          // console.log(eachChat?.users)
          <div
          key={index}
            onClick={() => setSelectedChat(eachChat)}
            className={`w-[317px] h-[93px] m-auto flex justify-center items-center mt-3 rounded-2xl ${
              selectedChat === eachChat
                ? "SelectedChat-bg cursor-pointer"
                : "chat-bg"
            }  `}
          >
            <div className="w-[293px] h-[69px] p=3 flex gap-4  ">
              <div>
                {" "}
                <Image
                  className="rounded-2xl"
                  src={avatar}
                  alt="avatar"
                  height={48}
                  width={48}
                />{" "}
              </div>
              <div className="w-[229px] h-[69px] flex flex-col gap-2 ">
                <div className="h-[39px] flex flex-col  ">
                  <div className="h-[21px] flex gap-3 text-[14px] font-inter ">
                    <div className="w-[186px]  ">
                      {!eachChat.isGroupChat
                        ? getSender(user, eachChat?.users)
                        : eachChat?.chatName}{" "}
                    </div>
                    <div className="w-[31px] opacity ">2h</div>
                  </div>
                  <div className="w-[229px] h-[18px] font-inter text-[12px] text-[#718096] ">
                    {eachChat.latestMessage && (
                      <p>
                        <b>{eachChat.latestMessage.sender.name} : </b>
                        {eachChat.latestMessage.content.length > 50
                          ? eachChat.latestMessage.content.substring(0, 51) +
                            "..."
                          : eachChat.latestMessage.content}
                      </p>
                    )}
                  </div>
                </div>
                <div className="h-[22px] w-[97px] rounded-2xl px-0.5 py-2 border border-[#CBD5E0] flex justify-center items-center ">
                  {" "}
                  <p className="font-inter text-xs text-[ #CBD5E0] ">
                    Some Content
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default MessageBox;
