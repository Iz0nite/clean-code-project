import CardComponent from "@/components/card-component"
import CardModal from "@/components/card-modal"
import { Card } from "@/utils/types"
import { useState } from "react"

type CardComponentWithCardModalProps = {
  card: Card
}

function CardComponentWithCardModal ({ card }: CardComponentWithCardModalProps) {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)

  return (
    <>
      <CardModal card={card} isCardModalOpen={isCardModalOpen} onCardModalOpenChange={setIsCardModalOpen}/>
      <div onClick={() => setIsCardModalOpen(true)}>
        <CardComponent card={card}/>
      </div>
    </>
  )
}

export default CardComponentWithCardModal