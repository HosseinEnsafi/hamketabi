"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react"
import { categories } from "@/lib/definition"
import { ChevronRight } from "lucide-react"
import { z } from "zod"
import { CreateCategorySchema } from "@/lib/schemas"

export type BookCategory = {
  name: string
  subcategories?: BookCategory[]
}

interface SelectCategoryProps {
  selectedCategory?: z.infer<typeof CreateCategorySchema>
  onSelect: (category: z.infer<typeof CreateCategorySchema>) => void
}

const SelectCategory = ({ selectedCategory = { name: "" }, onSelect }: SelectCategoryProps) => {
  const [open, setOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<BookCategory[]>(categories)
  const [breadcrumbs, setBreadcrumbs] = useState<BookCategory[]>([])

  const handleCategoryClick = (category: BookCategory) => {
    if (category.subcategories) {
      setBreadcrumbs((prev) => [...prev, { name: category.name }])
      setCurrentCategory(category.subcategories)
    } else {
      onSelect({ name: category.name })
      setOpen(false)
    }
  }

  const handleBack = () => {
    if (breadcrumbs.length < 1) return
    const updatedBreadcrumbs = [...breadcrumbs]
    updatedBreadcrumbs.pop()
    setBreadcrumbs(updatedBreadcrumbs)

    let parent: BookCategory[] = categories
    for (const breadcrumb of updatedBreadcrumbs) {
      const found = parent.find((cat) => cat.name === breadcrumb.name)
      if (found?.subcategories) {
        parent = found.subcategories
      }
    }
    setCurrentCategory(parent)
  }

  const resetCategory = () => {
    setCurrentCategory(categories)
    setBreadcrumbs([])
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger onClick={resetCategory} asChild>
        <Button variant="outline">
          {selectedCategory.name ? `${selectedCategory.name}` : "انتخاب دسته‌بندی"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-start text-xl font-semibold">انتخاب دسته‌بندی</DialogTitle>
        </DialogHeader>
        <div>
          {breadcrumbs.length > 0 && (
            <Button
              variant="ghost"
              className="rounded-full text-primary hover:text-primary"
              size={"icon"}
              onClick={handleBack}
            >
              <ChevronRight />
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {currentCategory.map((cat) => (
            <Button
              className="min-w-24 text-center"
              key={cat.name}
              variant="ghost"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SelectCategory
