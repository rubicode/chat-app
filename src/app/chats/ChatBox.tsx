import ChatContact from "./ChatContact";
import ChatRoom from "./ChatRoom";

export default function ChatBox() {
    return (
        <div>
            <div className="w-full h-32" style={{ backgroundColor: "#449388" }}></div>

            <div className="container mx-auto" style={{ "marginTop": "-128px" }}>
                <div className="py-6 h-screen">
                    <div className="flex border border-grey rounded shadow-lg h-full">
                        <ChatContact />
                        <ChatRoom />
                    </div>
                </div>
            </div>
        </div>
    )
}