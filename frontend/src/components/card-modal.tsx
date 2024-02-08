import { Card } from "@/utils/types"
import { Separator } from "./ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { formatDate } from "@/utils/helpers"

type CardModalProps = {
  card: Card
  isCardModalOpen: boolean
  onCardModalOpenChange: (value: boolean) => void
}

function CardModal ({ card, isCardModalOpen, onCardModalOpenChange }: CardModalProps) {
  return (
   <Dialog open={isCardModalOpen} onOpenChange={onCardModalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{card.question}</DialogTitle>
          <div className="flex justify-between items-center">
            <p>Category: {card.category}</p>
            <div>
              <DialogDescription>Tag: {card.tag}</DialogDescription>
              <DialogDescription>Last Answer: {formatDate(card.date)}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Separator />
        <div className="flex justify-center items-center h-[260px]">
          <div>
            <p>Answer:</p>
            <p className="font-bold">{card.answer}</p>
          </div>
        </div>
      </DialogContent>
   </Dialog>
  )
}

export default CardModal