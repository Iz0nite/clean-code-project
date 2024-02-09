import { Button } from "@/components/ui/button"

type TagFIlterListProps = {
  tags: string[]
  removeTagFromList: (tagToRemove: string) => void
}

function TagFIlterList ({ tags, removeTagFromList }: TagFIlterListProps) {
  return (
    <div className="flex flex-wrap gap-2 min-h-[72px]">
      {tags.map(tag => <Button variant={"secondary"} onClick={() => removeTagFromList(tag)}>{tag} X</Button> )}
    </div>
  )
}

export default TagFIlterList