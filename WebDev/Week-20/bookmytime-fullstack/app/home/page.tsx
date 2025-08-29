"use client";
import { NavBar } from "../components/Navbar";
import { Button } from "../components/Button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { title } from "process";
import { IoClose } from "react-icons/io5";
import { Input } from "../components/Input";
import { get } from "http";
import { useSession } from "next-auth/react";

export default function () {



  type Booking = {
    userId?: string
    user?: {
      email?: string;
      id?: string;
      // add other user properties if needed
    };
    // add other booking properties if needed
  };

  type Event = {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    creator: any;
    bookings: Booking[];
  };

  const [events, setEvents] = useState<Event[]>([]);
  const [editEvent, setEditEvent] = useState<Event>();
  const [diallog, setDialog] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const session = useSession();
  async function getEvents() {
    try {
      const res = await axios.get("http://localhost:3000/api/events/all");
      const myEmail = res.data.email;

      const events = res.data.events
      
      setEvents(res.data.events);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  async function bookEvent({ event, user }: any) {
    const res = await axios.post("http://localhost:3000/api/events/book", {
      creator: user,
      event: event,
    });

    if (res.status === 201) {
    }
  }

  return (
    <div className="h-screen relative">
      <NavBar home={true}
        onEventAdded={(newEvent) => {
          setEvents((prev) => [...prev, newEvent]);
        }}
      />

      {diallog ? (
        <div className=" absolute inset-0 max-w-95  max-h-150 min-h-130 m-auto bg-neutral-950 opacity-99 rounded-2xl outline-neutral-300 p-4 outline-1 ">
          <div>
            <div className="flex justify-end ">
              <IoClose
                onClick={() => {
                  setDialog(false);
                }}
                className="hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div className="flex justify-center text-lg">Edit Event</div>
            <div className=" space-y-4 my-8">
              <Input
                label="Title"
                placeholder={"Name of the event"}
                type={"text"}
                ref={titleRef}
                value={editEvent?.title}
                onChange={(e: { target: { value: any } }) =>
                  setEditEvent((ev) =>
                    ev ? { ...ev, title: e.target.value } : ev
                  )
                }
              />
              <Input
                label="Description"
                placeholder={"About the event"}
                type={"text"}
                ref={descriptionRef}
                value={editEvent?.description}
                onChange={(e: { target: { value: any } }) =>
                  setEditEvent((ev) =>
                    ev ? { ...ev, description: e.target.value } : ev
                  )
                }
              />
              <Input
                label="Location"
                placeholder={"Place of the event"}
                type={"text"}
                ref={locationRef}
                value={editEvent?.location}
                onChange={(e: { target: { value: any } }) =>
                  setEditEvent((ev) =>
                    ev ? { ...ev, location: e.target.value } : ev
                  )
                }
              />
              <Input
                label="Date"
                placeholder={"Date of the event"}
                type={"Date"}
                ref={dateRef}
                value={editEvent?.date}
                onChange={(e: { target: { value: any } }) =>
                  setEditEvent((ev) =>
                    ev ? { ...ev, date: e.target.value } : ev
                  )
                }
              />
            </div>
          </div>
          <div className="flex justify-center my-5">
            <Button
              name="Edit Event"
              onClick={async () => {
                const date = dateRef.current?.value || editEvent?.date;
                try {
                  const res = await axios.put(
                    "http://localhost:3000/api/events",
                    {
                      id: editEvent?.id,
                      title: titleRef.current?.value,
                      description: descriptionRef.current?.value,
                      date: date,
                      location: locationRef.current?.value,
                    }
                  );
                  await getEvents();
                  setDialog(false);
                } catch (error) {
                  console.error(error);
                  alert(error);
                  return;
                }
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="my-10  p-10 grid grid-cols-4 gap-13">
        {events.filter(event => event.creator.email !== session.data?.user?.email).map(event => (
          <div
            key={event.id}
            className="border-1 min-w-70 min-h-70 px-5 py-2 rounded-2xl flex flex-col"
          >
            <div className=" flex justify-between items-center border-b-1 py-4">
              <span className="text-lg text-amber-200">{event.title}</span>
              <span className="text-neutral-300 text-sm">
                {new Date(event.date).toDateString()}
              </span>
            </div>

            <div className="flex mt-5 justify-between gap-5 ">
              <span>{event.location} </span>
              <span className="text-green-600">
                {event.bookings.length}{" "}
                <span className="text-neutral-500 text-sm">Registrations</span>
              </span>
            </div>

            <div className="p-2 text-green-200 my-5 border-1 border-neutral-800 rounded-xl min-h-20">
              {event.description}
            </div>
            <div className=" flex justify-center gap-5">
                {event.bookings.some(booked=> booked.userId === event.creator.id) ? <Button name="Booked" extraStyle="bg-green-600 border-black" disabled={true} /> :
                
                <Button
                  name="Book Event"
                  onClick={async () => {
                    await axios.post("http://localhost:3000/api/events/book", {
                        event: event,
                        creator: event.creator
  
                    });
                    await getEvents();
                  }}
                />
                
                
                }

            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
