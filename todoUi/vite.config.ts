import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "../"),
         //"@server": path.resolve(__dirname, "../server/src"),
      },
   },
   plugins: [react()],
   server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000, 
      host: true, // Important for Aspire
      strictPort: true, // Exit if port is already in use
   },
})
