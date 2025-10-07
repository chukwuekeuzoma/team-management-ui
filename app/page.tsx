// import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input/input";
import { Textarea } from "@/components/ui/TextArea";
import { Search } from "@/components/ui/Search/Search";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/Select";
export default function Home() {
  return (
    <>
      {/* <div className="flex flex-col gap-2.5 items-center h-screen">
        <Button size="lg"> Martins</Button>
        <Input type="email" placeholder="Email" />
        <Search placeholder="Search..." />
        <Textarea placeholder="Type your message here." />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ok" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
    </>
  );
}
