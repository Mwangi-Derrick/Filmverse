import Footer from '@/components/Footer'
import Header from '../components/Header'
import './globals.css'

export const metadata = {
title: 'Create Next App',
description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
return (
<html lang="en">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<body className='bg-zinc-950 flex flex-col h-full'>
<Header />
            <main className='w-screen h-full min-h-screen pt-[60px] pb-[10px]'>
{children}
            </main>
            <Footer/>
</body>
</html>
)
}
