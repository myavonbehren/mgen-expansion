import { ModeToggle } from "@/components/mode-toggle"

export function Footer() {
  return (
    <footer className="flex justify-between items-center p-4 bg-background border-t">
      <p>MyGen</p>
      <ModeToggle />
    </footer>
  )
}