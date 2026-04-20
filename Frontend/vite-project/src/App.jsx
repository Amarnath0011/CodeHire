import AppRoutes from "./routes/AppRoutes"
import Navbar from "./Components/Navbar"
function App() {

  return (
    <>
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <AppRoutes />
    </div>
    </>
 
  )
}

export default App
