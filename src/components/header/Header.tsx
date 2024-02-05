import { Trash } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useAppDispatch } from "../../hooks/hooks";
import { clearMessages } from "../../store/slice/messageSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="w-full h-14 flex justify-between px-4 py-2 items-center">
        <h3 className="font-bold">Chat App</h3>
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            className="w-1/3"
            onClick={() => dispatch(clearMessages())}
          >
            <Trash size={20} />
          </Button>
          <ModeToggle />
          <Avatar>
            <AvatarImage src="https://github.com/akshaypx.png" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Header;
