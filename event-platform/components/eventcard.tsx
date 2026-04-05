import  Link  from "next/link"
import React from 'react'
import Image from "next/image";

interface Props {
  title: string;
  image: string;
  slug : string;
  location: string;
  date: string;
  time: string;
}

const Eventcard = ({title, image, slug, location, date, time}: Props) => {
  return (
   <Link href={`/events/${slug}`} id='event-card'>
        <img src={image} alt={title} width={410} height={300} className="poster" />
        <div className="flex flex-row gap-2"> 
            <img src="/icons/pin.svg" alt="location" width={14} height={14} />
            <p>{location}</p>
        </div>
        <p className='title text-left'>{title}</p>
        <div className="datetime">
              <img src="/icons/calendar.svg" alt="date" width={14} height={14} />
            <p>{date}</p>
        </div>
         <div className="datetime">
              <img src="/icons/clock.svg" alt="time" width={14} height={14} />
            <p>{time}</p>
        </div>

   </Link>
  )
}

export default Eventcard
