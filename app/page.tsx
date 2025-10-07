// import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/Select";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button size="lg"> Martins</Button>
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
    </div>
  );
}
