import { useFetchCards } from "@/services/card.service"
import { useState } from "react"
import TagFilterInput from "./tag-filter-form/tag-filter-input"
import TagFIlterList from "./tag-filter-form/tag-filter-list"
import CreateCardForm from "./create-card-form"
import CardComponentWithCardModal from "./card-with-modal"

function ErrorComponent () {
  return <h2 className="mx-auto">An error has occurred while retrieving cards</h2>
}

function LoadingComponent () {
  return <h2 className="mx-auto">Loading...</h2>
}

function CardList () {
  const [tags, setTags] = useState<string[]>([])

  const {data: cards, status: fetchCardsRequestStatus} = useFetchCards( { tags } )

  function addTagToList (tagToAdd: string) {
    setTags([...tags, tagToAdd])
  }

  function removeTagFromList (tagToRemove: string) {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }
  
  if (fetchCardsRequestStatus === "error") {
    return <ErrorComponent />
  }

  if (fetchCardsRequestStatus === "pending") {
    return <LoadingComponent />
  }

  return (
    <div className="h-screen flex flex-col gap-6 px-6">
      <div className="w-full flex justify-between items-center">
        <CreateCardForm />
        <div className="flex flex-col">
          <TagFIlterList tags={tags} removeTagFromList={removeTagFromList}/>
          <TagFilterInput addTagToList={addTagToList} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        { cards.map(card => <CardComponentWithCardModal key={card.id} card={card}/>) }
      </div>
    </div>
  )
}

export default CardList