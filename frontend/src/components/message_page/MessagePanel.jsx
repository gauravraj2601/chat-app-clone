import React, { useEffect, useState } from "react";
import Image from "next/image";
import arr from "../../assets/downArr.svg";
import plus from "../../assets/plus.svg";
import MessageBox from "../sub-components/MessageBox";
import {  useAuth } from "../../app/auth-provider";
import { Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import {api} from "../../api/api"
const MessagePanel = () => {

  const {auth,selectedChat, setSelectedChat, user, chats, setChats  }= useAuth();
  const [loggedUser, setLoggedUser] = useState();
  const [isLoading, setIsLoading]= useState(false)
  const toast = useToast();
 
  const fetchChats = async () => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmI5MDkyMjBlNDZhNTk2Y2NhY2I0MyIsImlhdCI6MTcwNzkzNDc4NiwiZXhwIjoxNzEwNTI2Nzg2fQ.FnWCf6egtov6oZ6cQl8UiKvto8GziXyCnggA1nyW7dM`,
        },
      };

      const { data } = await axios.get(`${api}/chat`, config);
      // console.log(data)
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    setIsLoading(true)
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    if (user) { // Add this check
      fetchChats();
    }
  }, [user, fetchChats]);

  // console.log(loggedUser)
  // console.log(user)

  console.log(user?"true":"false")
  console.log(chats)

  return (
    <div className="w-[349px] bg-background border-r-2  border-gray-200 ">
      <div className="h-[88px] p-6 flex items-center justify-between bg-background">
        <div className="flex justify-center items-center gap-[6px]  ">
          <div className="text-[20px] font-inter text-black leading-[30px]">Message</div>{" "}
          <div>
            <Image src={arr} alt="arr-icon" height={16} width={16} />
          </div>{" "}
          <div className="w-[30px] h-[22px] px-2 py-1 rounded-[24px] ont-inter font-semibold text-xs leading-6 bg-gray-200 text-center flex items-center">
            12
          </div>{" "}
        </div>
        <div>
          <Image src={plus} alt="plus" height={40} width={40} />
        </div>
      </div>
      <hr className="border-t-2" />
      {/* <button onClick={()=>setCount(count+1)} >Inc</button> */}
      <div className="h-[72px] py-3 px-6 ">
      <div className="h-[48px] w-[301px] flex items-center gap-3 px-5 py-[10px] rounded-[12px]  bg-[#F3F3F3] ">
          <div className="w-[50px] h-[17px] text-sm font-inter font-normal   ">
            Search
          </div>
          <div>
            <input
              className="h-[21px] text-sm font-inter font-normal bg-[#F3F3F3] leading-6 placeholder-[#000000] border-none focus:border-none outline-none"
              type="search"
              placeholder="Search messages"
              // onChange={handleSearch}
            />{" "}
          </div>
        </div>
      </div>
      <div className="h-[780px] overflow-scroll scrollbar-none" >
          {isLoading?(
            <MessageBox chats={chats}/>
          ):(
            <Spinner size={"xl"} ml={"30%"} thickness='4px' color='red.500' />
          )}
         {/* <MessageBox />
         <MessageBox />
         <MessageBox />
         <MessageBox />
         <MessageBox />
         <MessageBox />
         <MessageBox />
         <MessageBox />
         <MessageBox /> */}
      </div>
    </div>
  );
};

export default MessagePanel;
