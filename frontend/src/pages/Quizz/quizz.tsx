import { useFetchQuizz } from "@/services/quizz.service"
import StartQuizzForm from "./start-quizz-form"
import { useState } from "react"
import QuizzCardDisplayer from "./quizz-card-displayer"

function ErrorComponent () {
  return <h2 className="mx-auto">An error has occurred while retrieving the quizz</h2>
}

function LoadingComponent () {
  return <h2 className="mx-auto">Loading...</h2>
}

function Quizz () {
  const [quizzDate, setQuizzDate] = useState<string>()

  const {data: quizzCards, status: fetchQuizzRequestStatus, fetchStatus: fetchQuizzRequestFetchStatus} = useFetchQuizz({ date: quizzDate })

  if (fetchQuizzRequestStatus === "error") {
    return <ErrorComponent />
  }

  if (fetchQuizzRequestStatus === "pending" && fetchQuizzRequestFetchStatus !== "idle") {
    return <LoadingComponent />
  }

  function onStartQuizz (date?: string) {
    setQuizzDate(date)
  }

  return (
    <div className="h-screen flex flex-col items-center">
      {!quizzCards ?
        <StartQuizzForm onStartQuizz={onStartQuizz}/>
      :
        <QuizzCardDisplayer cards={quizzCards}/>
      }
    </div>
  )
}

export default Quizz