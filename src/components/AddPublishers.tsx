"use client"
import { CreatePublisherSchema } from "@/lib/schemas"
import { z } from "zod"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"

interface AddPublishersProps {
  publishers: z.infer<typeof CreatePublisherSchema>[]
  onAdd: (publishers: z.infer<typeof CreatePublisherSchema>[]) => void
}

type Publisher = {
  name: string
  publishedAt: Date
}

const AddPublishers = ({ publishers = [], onAdd }: AddPublishersProps) => {
  const [selectedPublishers, setSelectedPublishers] = useState<Publisher[]>(publishers)
  const [newPublisher, setNewPublisher] = useState<z.infer<typeof CreatePublisherSchema>>({
    name: "",
    publishedAt: new Date(),
  })

  const handleAddPublisher = () => {
    if (!newPublisher.name || !newPublisher.publishedAt) return

    const updatedPublishers = [...selectedPublishers, { ...newPublisher }]
    setSelectedPublishers(updatedPublishers)
    onAdd(updatedPublishers)
    setNewPublisher({ name: "", publishedAt: new Date() })
  }

  const handleDeletePublisher = (index: number) => {
    const updatedPublishers = selectedPublishers.filter((_, i) => i !== index)
    setSelectedPublishers(updatedPublishers)
    onAdd(updatedPublishers)
  }

  return (
    <Accordion className="rounded bg-muted p-0.5 px-3 shadow" type="single" collapsible>
      <AccordionItem className="border-none" value="publishers">
        <AccordionTrigger className="text-lg hover:no-underline">اطلاعات ناشر</AccordionTrigger>
        <AccordionContent className="text-white">
          <div className="mb-4 flex flex-wrap items-end gap-2">
            <div className="flex w-full flex-1 flex-col gap-1">
              <label htmlFor="name">ناشر</label>
              <input
                type="text"
                value={newPublisher.name}
                onChange={({ target }) => setNewPublisher({ ...newPublisher, name: target.value })}
                className="rounded border p-2 outline-none"
              />
            </div>
            <div className="flex w-full flex-1 flex-col gap-1">
              <label htmlFor="name"> تاریخ نشر</label>
              <input
                type="date"
                value={newPublisher.publishedAt.toISOString().split("T")[0]}
                onChange={({ target }) =>
                  setNewPublisher({ ...newPublisher, publishedAt: new Date(target.value) })
                }
                className="rounded border p-2 outline-none"
              />
            </div>
            <Button
              type="button"
              onClick={handleAddPublisher}
              className="flex-grow-0 bg-primary text-white"
            >
              افزودن
            </Button>
          </div>

          <div>
            {selectedPublishers.length > 0 ? (
              <ul className="space-y-2">
                {selectedPublishers.map((publisher, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded bg-primary p-2 text-white"
                  >
                    <div>
                      <strong>{publisher.name}</strong> -{" "}
                      <time dateTime={publisher.publishedAt.toLocaleDateString()}>
                        {publisher.publishedAt.toLocaleDateString("fa-IR")}
                      </time>
                    </div>
                    <button
                      type="button"
                      className="text-destructive"
                      onClick={() => handleDeletePublisher(index)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">هیچ ناشری اضافه نشده است.</p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AddPublishers
