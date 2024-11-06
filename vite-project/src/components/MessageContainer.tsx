import { TProfile } from "@/Interfaces/Interface";
import Message from "./Message";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import GroupMessage from "./GroupMessage";

export default function MessageContainer({ toggleOtherProfile, setProfileStatus, showProfile, socket, activeChatls, setActiveChatls, onlineUsersList }: { toggleOtherProfile: () => void, showProfile: boolean, setProfileStatus: (value: boolean) => void, socket: Socket | undefined, activeChatls: TProfile, setActiveChatls: (value: []) => void, onlineUsersList: [] }) {
    const messageProfileData = useSelector((state: IRootState) => state.messageProfileData)
    return (<>
        {messageProfileData.group ?
            <GroupMessage {...{ toggleOtherProfile, showProfile, setProfileStatus, socket, activeChatls, setActiveChatls, onlineUsersList }} />
            :
            <Message {...{ toggleOtherProfile, showProfile, setProfileStatus, socket, activeChatls, setActiveChatls, onlineUsersList }} />
        }
    </>)
}
