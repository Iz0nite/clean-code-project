import { ShadcnCard, ShadcnCardContent, ShadcnCardDescription, ShadcnCardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/utils/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"

type QuizzCardProps = {
  card: Card
  onValidAnswer: (isValid: boolean) => void
}

const QuizzCardFormSchema = z.object({
  userAnswer: z.string()
})

function QuizzCard ( { card, onValidAnswer }: QuizzCardProps ) {
  const [ userAnswer, setUserAnswer ] = useState<string>()

  const form = useForm<z.infer<typeof QuizzCardFormSchema>>({
    resolver: zodResolver(QuizzCardFormSchema),
    defaultValues: {
      userAnswer: "",
    },
  })

  function onSubmit(values: z.infer<typeof QuizzCardFormSchema>) {
    setUserAnswer(values.userAnswer)
  }

  function onSubmitAnswerValidity (isValid: boolean) {
    setUserAnswer(undefined)
    onValidAnswer(isValid)
  }

  return (
    <ShadcnCard>
      <ShadcnCardHeader>
        <div className="flex flex-row justify-between">
          <ShadcnCardDescription>Category: {card.category}</ShadcnCardDescription>
          <ShadcnCardDescription>Tag: {card.tag}</ShadcnCardDescription>
        </div>
      </ShadcnCardHeader>
      <Separator />
      <ShadcnCardContent className="pt-6">
        <p className="font-bold">{card.question}</p>
        {
          !userAnswer ?
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="userAnswer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your answer</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          :
            <div>
              <p>Your answer: {userAnswer}</p>
              <p>Response in card: {card.answer}</p>
              <div className="flex justify-between mt-3">
                <Button variant="destructive" onClick={() => onSubmitAnswerValidity(false)}>
                  I'm wrong...
                </Button>
                <Button onClick={() => onSubmitAnswerValidity(true)}>
                  I'm right !
                </Button>
              </div>
            </div>
        }
      </ShadcnCardContent>
    </ShadcnCard>
  )
}

export default QuizzCard