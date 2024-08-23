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

  const persons = [
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'},
    {firstName: 'Toto', lastName: 'Marti'}
  ]
  
  return (
<div className="h-screen w-screen bg-purple-50 px-24 py-12 relative">
    <div className='bg-purple-200 w-full h-full px-12 py-12 flex'>
      <div className='bg-white overflow-scroll w-full relative flex flex-col'>
      <div className='absolute inset-1/2 w-6 h-6 bg-purple-800'>tt</div>
      {persons.map((p) => 
      <div className='flex space-x-2'>
        <p>{p.firstName}</p>
        <p>{p.lastName}</p>
        </div>
      )}
       <div class='w-full sticky bottom-0 flex justify-end'>
          <div className='w-fit bg-purple-500'>button</div>
      </div>
      </div>
    </div>
  <div className='absolute top-0 left-0 bg-purple-500'>
    Button
  </div>
</div>
  )
}