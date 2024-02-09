import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useAddCard } from "@/services/card.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const addCarFormSchema = z.object({
  question: z.string(),
  answer: z.string(),
  tag: z.string().optional(),
})

function CreateCardForm () {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()
  
  const addCardMutation = useAddCard({
    onSuccess: () => {
      setIsLoading(false)
      toast({
        title: "Your card has been created !",
      })
      queryClient.invalidateQueries({ queryKey: ["getCards"] })
    },
    onError: () => {
      setIsLoading(false)
      toast({
        variant: "destructive",
        title: "An error occurred!",
        description: "An error occurred during the card creation.",
      })
    },
  })

  const form = useForm<z.infer<typeof addCarFormSchema>>({
    resolver: zodResolver(addCarFormSchema),
    defaultValues: {
      question: "",
      answer: "",
      tag: "",
    },
  })

  function onSubmit(values: z.infer<typeof addCarFormSchema>) {
    setIsLoading(true)
    addCardMutation.mutate(values)
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New card</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new card</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The question for your card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The answer of your question.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    An optional tag.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCardForm