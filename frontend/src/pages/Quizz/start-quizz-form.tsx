import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type StartQuizzFormProps = {
  onStartQuizz: (quizzDate?: string) => void
}

const StartQuizzFormSchema = z.object({
  date: z.date().optional(),
})

function StartQuizzForm ({ onStartQuizz }: StartQuizzFormProps) {
  const form = useForm<z.infer<typeof StartQuizzFormSchema>>({
    resolver: zodResolver(StartQuizzFormSchema),
  })

  function onSubmit(data: z.infer<typeof StartQuizzFormSchema>) {
    const quizzDate = data.date ? data.date : new Date()
    onStartQuizz(quizzDate.toLocaleDateString("en-US"))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                    >
                      {field.value ? (
                        new Date(field.value).toDateString()
                      ) : (
                        <span>Pick a date (optional)</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Start Quizz !</Button>
      </form>
    </Form>
  )
}

export default StartQuizzForm