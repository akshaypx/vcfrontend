import { Button } from "../../components/ui/button";
import SpeechRecognitionComponent from "../../components/speechRecognition/SpeechRecognition";
import { Input } from "../../components/ui/input";
import { SendHorizontal } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToMessages, fetchMessage } from "../../store/slice/messageSlice";
import { Skeleton } from "../../components/ui/skeleton";
import Speech from "../../components/speech";
import { ProductsEntity } from "../../interfaces/messageInterface";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const responseData = useAppSelector((state) => state.message.responseData);
  const messages = useAppSelector((state) => state.message.messages2);
  const isLoading = useAppSelector((state) => state.message.loading);
  const dispatch = useAppDispatch();
  const messageContainerRef = useRef<null | HTMLDivElement>(null);

  const sendMessage = (text: string) => {
    const query = text;
    setSearchTerm("");
    const body = {
      user_request: query,
      ask_for: responseData?.ask_for,
      current_intent: responseData?.current_intent,
      cart_id: responseData?.cart_id,
      address_id: responseData?.address_id,
      order_id: responseData?.order_id,
      prv_response: responseData?.prv_response,
      products: responseData?.products?.map((p) => {
        const price = p.price.toString();
        return { ...p, price };
      }),
      selectedProduct: responseData?.selectedProduct
        ? {
            ...responseData.selectedProduct,
            price: responseData?.selectedProduct?.price.toString(),
          }
        : null,
    };
    dispatch(addToMessages(body));
    dispatch(fetchMessage(body));
  };

  useEffect(() => {
    // Scroll to the latest message when messages change
    if (messageContainerRef.current) {
      const latestMessage = messageContainerRef.current
        .lastChild as unknown as HTMLDivElement;
      if (latestMessage) {
        latestMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(searchTerm);
  };

  return (
    <div className="w-full h-[90vh] flex flex-col p-2">
      <div className="bg-primary-foreground rounded-md p-2 h-4/5 flex-1 flex flex-col justify-start items-center gap-2 overflow-hidden overflow-y-scroll ">
        {messages.map((message, idx) => {
          if (idx % 2 == 0) {
            return (
              <div key={idx} className="w-full flex items-center justify-end">
                <div className="bg-background p-1 rounded-md max-w-80 px-2 border border-bg-primary">
                  {message.text}
                </div>
              </div>
            );
          }
          return (
            <div
              key={idx}
              className="w-full flex items-start justify-start gap-1"
              ref={messageContainerRef}
            >
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>BT</AvatarFallback>
              </Avatar>
              <div className="bg-background p-1 rounded-md max-w-96 px-2 border border-bg-primary">
                <span>{message.text}</span>
                <div className="m-2 overflow-y-scroll">
                  <div className="max-w-[500px] flex gap-2 overflow-hidden">
                    {message.selectedProduct ? (
                      <div className="w-fit flex flex-col justify-between p-2 border border-bg-primary rounded-md bg-primary-foreground">
                        <span className="font-bold">
                          {message.selectedProduct.product_name.length > 10
                            ? message.selectedProduct.product_name.substring(
                                0,
                                10
                              ) + "..."
                            : message.selectedProduct.product_name}
                        </span>
                        <span>
                          {message.selectedProduct.summary.length > 20
                            ? message.selectedProduct.summary.substring(0, 20) +
                              "..."
                            : message.selectedProduct.summary}
                        </span>
                        <span className="font-semibold">
                          Rs. {message.selectedProduct.price}
                        </span>
                      </div>
                    ) : (
                      message.products &&
                      message.products.map((p: ProductsEntity, _) => (
                        <div
                          className="w-full flex flex-col justify-between p-2 border border-bg-primary rounded-md bg-primary-foreground"
                          key={_}
                        >
                          <span className="font-bold">
                            {p.product_name.length > 10
                              ? p.product_name.substring(0, 10) + "..."
                              : p.product_name}
                          </span>
                          <span>
                            {p.summary.length > 20
                              ? p.summary.substring(0, 20) + "..."
                              : p.summary}
                          </span>
                          <span className="font-semibold">Rs. {p.price}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="border border-bg-primary-foreground p-2 rounded-full">
                <Speech pitch={1} rate={1} voice={1} text={message.text} />
              </div>
            </div>
          );
        })}
        {isLoading === "pending" && (
          <div className="w-full flex items-start justify-start gap-1">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>BT</AvatarFallback>
            </Avatar>
            <div className="bg-background p-2 rounded-md max-w-96 px-2 border border-bg-primary">
              <span className="flex flex-col gap-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-14 flex gap-2 items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full flex gap-2 items-center"
        >
          <Input
            className="flex-1"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant={"ghost"} type="submit">
            <SendHorizontal size={20} />
          </Button>
        </form>
        <SpeechRecognitionComponent
          sendMessage={sendMessage}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default Home;
