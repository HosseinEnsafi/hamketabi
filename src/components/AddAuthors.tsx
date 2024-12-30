import { CreateAuthorSchema } from "@/lib/schemas"
import { z } from "zod"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AuthorRole } from "@prisma/client"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "./ui/button"
import { Trash2Icon } from "lucide-react"

const roleLabels: Record<AuthorRole, string> = {
  WRITER: "نویسنده",
  TRANSLATOR: "مترجم",
  EDITOR: "ویراستار",
  ILLUSTRATOR: "تصویرگر",
  CO_AUTHOR: "نویسنده همکار",
}

interface AddAuthorsProps {
  authors: z.infer<typeof CreateAuthorSchema>[]
  onAdd: (authors: z.infer<typeof CreateAuthorSchema>[]) => void
}

const AddAuthors = ({ authors, onAdd }: AddAuthorsProps) => {
  const [selectedAuthors, setSelectedAuthors] = useState(authors)
  const [newAuthor, setNewAuthor] = useState<z.infer<typeof CreateAuthorSchema>>({
    name: "",
    role: "WRITER",
  })

  const handleAddAuthor = () => {
    if (!newAuthor.name || !newAuthor.role) return

    const updatedAuthors = [...selectedAuthors, { ...newAuthor }]
    setSelectedAuthors(updatedAuthors)
    onAdd(updatedAuthors)
    setNewAuthor({ name: "", role: "WRITER" })
  }

  const handleDeleteAuthor = (index: number) => {
    const updatedAuthors = selectedAuthors.filter((_, i) => i !== index)
    setSelectedAuthors(updatedAuthors)
    onAdd(updatedAuthors)
  }

  return (
    <Accordion className="rounded bg-muted p-0.5 px-3 shadow" type="single" collapsible>
      <AccordionItem className="border-none" value="publishers">
        <AccordionTrigger className="text-lg hover:no-underline">اطلاعات پدید آورنده</AccordionTrigger>
        <AccordionContent>
          <div className="mb-4 flex flex-wrap gap-2">
            <div className="flex w-full flex-1 flex-col gap-1">
              <label htmlFor="name">پدیدآورنده</label>
              <input
                type="text"
                value={newAuthor.name}
                onChange={({ target }) => setNewAuthor({ ...newAuthor, name: target.value })}
                className="rounded border p-2 outline-none"
              />
            </div>
            <div className="flex w-full flex-1 flex-col gap-1">
              <label htmlFor="name">نقش</label>
              <Select>
                <SelectTrigger className="bg-white focus:ring-0 dark:bg-[#121212]">
                  <SelectValue className="" placeholder="مثال: نویسنده" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleLabels).map(([key, value], i) => (
                    <SelectItem key={i} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              onClick={handleAddAuthor}
              className="flex-grow-0 self-end bg-primary text-white"
            >
              افزودن
            </Button>
          </div>

          <div>
            {selectedAuthors.length > 0 ? (
              <ul className="space-y-2">
                {selectedAuthors.map((author, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded bg-primary p-2 text-white"
                  >
                    <div>
                      <strong>{author.name}</strong> - <span>{roleLabels[author.role]}</span>
                    </div>
                    <button
                      type="button"
                      className="text-destructive"
                      onClick={() => handleDeleteAuthor(index)}
                    >
                      <Trash2Icon size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">هیچ پدیدآورنده ای اضافه نشده است.</p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
export default AddAuthors
