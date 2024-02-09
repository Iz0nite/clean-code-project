import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Header = () => {

  return (
    <header className="flex px-8 py-4 items-center justify-between sticky top-0 bg-gray-300 drop-shadow-md z-50 h-18">
      <h1>
        <Link to="/">CardQuizz</Link>
      </h1>
      <div className="flex gap-8">
        <Button asChild>
            <Link to="/cards">Card List</Link>
        </Button>
        <Button asChild>
            <Link to="/quizz">Quizz</Link>
        </Button>
      </div>
    </header>
  )
}

export default Header
