import { Outlet } from "react-router-dom"
import { Footer, Header } from "./components"
function App() {
  return (
    <div>
    <Header/>
     <Outlet/>     
    </div>
  )
}

export default App
