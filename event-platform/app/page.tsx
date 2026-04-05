import Explorebtn from '@/components/Explorebtn'
import { title } from 'process'
import React from 'react'
import Eventcard from "@/components/eventcard"

const events = [
  {
    id: 1,
    image: "/images/event1.png", 
    title: "Event 1"
  },
   {
    id: 1,
    image: "/images/event2.png", 
    title: "Event 2"
  }
]

const Home = () => {
  return (
    <section className='text-center mt-2'>
      <h1>The Hub for Every Dev <br /> Event You Can't Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups and Conferences, All in one Place</p>
      <Explorebtn />
      <div className='mt-20 space-y-7 '>
        <h3>Featuted Events</h3>
        <ul className='events'>
          {
            events.map((event) => (
              <li key={event.id} className='event-card'>
                 <Eventcard {...event}/>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default Home
