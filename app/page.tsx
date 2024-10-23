// app/page.tsx
import { redirect } from 'next/navigation';
import "./globals.css";

export default function HomeRedirect() {
  redirect('/home');
}
