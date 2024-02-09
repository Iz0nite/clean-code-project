import QuizzCard from "@/components/quizz-card";
import { toast } from "@/components/ui/use-toast";
import { useAnswerQuestion } from "@/services/quizz.service";
import { Card } from "@/utils/types";
import { useEffect, useState } from "react";

type QuizzCardDisplayerProps = {
  cards: Card[]
}



function QuizzCardDisplayer ({ cards }: QuizzCardDisplayerProps) {
  const [ remainingCards, setRemainingCards ] = useState<Card[]>([])
  
  useEffect(() => {
    setRemainingCards(cards);
  }, [cards]);

  const addCardMutation = useAnswerQuestion({
    onSuccess: () => {
      toast({
        title: "Answer sended",
      })
      setRemainingCards([...remainingCards.slice(1)])
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "An error occurred!",
        description: "An error occurred during the card update.",
      })
    },
  })

  if (remainingCards.length === 0) {
    return (
      <h2>No more cards for today !</h2>
    )
  }

  function onValidAnswer (isValid: boolean) {
    addCardMutation.mutate({cardId: remainingCards[0].id, body: { isValid }})
  }

  return (
    <div>
      <h2>Remaining cards: {remainingCards.length}</h2>
      <QuizzCard card={remainingCards[0]} onValidAnswer={onValidAnswer} />
    </div>
  )
}

export default QuizzCardDisplayer