const Time = ({ date }: { date: Date }) => {
  return (
    <time className="text-xs text-muted-foreground">
      {new Date(date).toLocaleString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  )
}
export default Time
