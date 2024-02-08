import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const FormSchema = z.object({
  tag: z.string()
})

type TagFilterInputProps = {
  addTagToList: (tagToAdd: string) => void 
}

function TagFilterInput ({ addTagToList }: TagFilterInputProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tag: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addTagToList(data.tag)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((onSubmit))} className="flex gap-2 items-start ">
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter a tag" {...field} />
              </FormControl>
              <FormDescription>
                You can add multiple tags to filter the card list.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )

}

export default TagFilterInput