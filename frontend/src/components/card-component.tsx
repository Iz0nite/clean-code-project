import { Card } from "@/utils/types"
import { ShadcnCard, ShadcnCardContent, ShadcnCardDescription, ShadcnCardHeader } from "./ui/card"
import { Separator } from "./ui/separator"

type CardComponentProps = {
  card: Card
}

function CardComponent ({ card }: CardComponentProps) {

  return (
    <ShadcnCard  className="hover:bg-slate-100">
      <ShadcnCardHeader className="flex justify-between">
        <p>Category: {card.category}</p>
        <ShadcnCardDescription>{card.tag}</ShadcnCardDescription>
      </ShadcnCardHeader>
      <Separator />
      <ShadcnCardContent className="flex justify-center items-center h-[260px]">
        <p className="font-bold text-center">{card.question}</p>
      </ShadcnCardContent>
    </ShadcnCard>
  )
}

export default CardComponent