import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  //! For Akatron Server
  server: {
    port: 80,
    host: '93.180.133.185',
  }
})
