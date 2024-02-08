import CardComponent from "@/components/card-component"
import { useFetchCards } from "@/services/card.service"
import { useState } from "react"
import TagFilterInput from "./tag-filter/tag-filter-input"
import TagFIlterList from "./tag-filter/tag-filter-list"

function ErrorComponent () {
  return <h2 className="mx-auto">An error has occurred while retrieving cards</h2>
}

function LoadingComponent () {
  return <h2 className="mx-auto">Loading...</h2>
}

function CardList () {
  const [tags, setTags] = useState<string[]>([])

  const fetchCardsRequest = useFetchCards( { tags } )
  
  if (fetchCardsRequest.error) {
    return <ErrorComponent />
  }

  if (fetchCardsRequest.status === "pending") {
    return <LoadingComponent />
  }

  function addTagToList (tagToAdd: string) {
    setTags([...tags, tagToAdd])
  }

  function removeTagFromList (tagToRemove: string) {

    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="h-screen flex flex-col gap-6 px-6">
      <div className="w-full flex justify-between items-center">
        <p>Future input</p>
        <div className="flex flex-col">
          <TagFIlterList tags={tags} removeTagFromList={removeTagFromList}/>
          <TagFilterInput addTagToList={addTagToList} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        { fetchCardsRequest.data.map(card => <CardComponent card={card}/>) }
      </div>
    </div>
  )
}

export default CardList