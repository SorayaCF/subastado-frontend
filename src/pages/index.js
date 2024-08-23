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
    socket.on('receive_message', (data) => {
      setReceived(data)
    })
  }, [])

  useEffect(() => {
    const added = [...messages, received]
    setMessages(added)
  }, [received])

  const sendMessage = () => {
    socket.emit('send_message', {message: input, room: room})
  }

  const joinRoom = (room) => {
    socket.emit('join_room', room)
  }

  const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

  const createRoom = () => {
    try {
      const newRoomId = makeid(7)
      joinRoom(newRoomId)
      router.push(`/${newRoomId}`)
    } catch (err) {
      console.log('err', err)
    }
  }
  
  return (
    <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg border border-2 shadow-lg p-8">
          <p className="text-gray-700 mb-4">Poner un nombre de usuario</p>
          <input className='mb-2' placeholder='Nombre de usuario' onChange={(e) => setPseudo(e.target.value)}/>
          <button onClick={createRoom} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Crear una partida nueva</button>
        </div>
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
