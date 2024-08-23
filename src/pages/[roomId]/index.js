import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')
import { useRouter } from 'next/router'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [received, setReceived] = useState({})
  const [room, setRoom] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [input, setInput] = useState('')

  useEffect(() => {
    if (router?.query?.roomId) {
      socket.emit('join_room', router.query.roomId)
    }
  }, [])


  // useEffect(() => {
  //   socket.on('receive_message', (data) => {
  //     setReceived(data)
  //   })
  // }, [])

  // useEffect(() => {
  //   const added = [...messages, received]
  //   setMessages(added)
  // }, [received])

  // const sendMessage = () => {
  //   socket.emit('send_message', {message: input, room: room})
  // }

  // const joinRoom = (room) => {
  //   socket.emit('join_room', room)
  // }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
COUCOU
    </div>
  // <div className='flex flex-col m-auto h-auto'>
  // <input placeholder='Room Nb' onChange={(e) => setRoom(e.target.value)}/>
  // <button onClick={joinRoom}>Join room</button>
  // <input placeholder='Message' onChange={(e) => setInput(e.target.value)}/>
  // <button onClick={sendMessage}>Send Message</button>
  // <div>{JSON.stringify(messages)}</div>
  // </div>
  )
}
