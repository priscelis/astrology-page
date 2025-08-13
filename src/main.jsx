import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import './index.css'
import AstroRouter from './router/AstroRouter'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={AstroRouter}/>
  </StrictMode>,
)
