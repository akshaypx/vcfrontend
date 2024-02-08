import { useEffect } from "react";
import "regenerator-runtime/runtime";
import { Button } from "../ui/button";
import { Mic } from "lucide-react";
import annyang from "annyang";

interface ISpeechRecognitionProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (arg0: string) => void;
}

const SpeechRecognitionComponent = ({
  setSearchTerm,
  sendMessage,
}: ISpeechRecognitionProps) => {
  useEffect(() => {
    if (annyang) {
      annyang.addCallback("result", (phrases: string[]) => {
        const firstPhrase = phrases[0];
        console.log(
          firstPhrase.includes("VC")
            ? handleWordDetection(firstPhrase.toLocaleLowerCase().substring(3))
            : "No hot word"
        );
      });

      annyang.start();

      return () => {
        annyang.abort();
        annyang.removeCallback("result");
      };
    }
  });

  const handleWordDetection = (text: string) => {
    setSearchTerm(text);
    sendMessage(text);
  };

  return (
    <div>
      <Button variant={"destructive"}>
        <Mic size={20} />
      </Button>
    </div>
  );
};

export default SpeechRecognitionComponent;
