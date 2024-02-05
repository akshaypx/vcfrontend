import { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "../ui/button";
import { Mic } from "lucide-react";

interface ISpeechRecognitionProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}

const SpeechRecognitionComponent = ({
  setSearchTerm,
  sendMessage,
}: ISpeechRecognitionProps) => {
  const [showRecognize, setShowRecognize] = useState<boolean>(false);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  useEffect(() => {
    let silenceTimer: any;
    let speakingTimer: any;

    if (transcript) {
      setSearchTerm(transcript);
      clearTimeout(silenceTimer);
      clearTimeout(speakingTimer);

      speakingTimer = setTimeout(() => {
        //invoke anything after speaking
        stopListening(); // Stop listening when the user stops speaking
        setShowRecognize(false);
        resetTranscript();
        sendMessage();
      }, 1000);
    } else {
      // If there's no transcript (user not speaking), clear timers
      silenceTimer = setTimeout(() => {
        //not speaking anything
        stopListening(); // Stop listening after the user doesn't speak for 3 seconds
        setShowRecognize(false);
      }, 3000);
    }

    return () => {
      clearTimeout(silenceTimer);
      clearTimeout(speakingTimer);
    };
  });

  const startListening = () => {
    //resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <Button
        variant={showRecognize ? "destructive" : "ghost"}
        onClick={() => {
          setShowRecognize(true);
          startListening();
        }}
      >
        <Mic size={20} />
      </Button>
    </div>
  );
};

export default SpeechRecognitionComponent;
