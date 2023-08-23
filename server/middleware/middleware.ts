import express, { Express } from 'express';
import cors from 'cors'

export default function Middleware(app: Express) {
    app.use(cors())
    app.use(express.json())
}