import Image from "next/image";
import DragFile from "./components/sections/file-upload/DragFile";

export default function Home() {
  return (
    <div>
      <h1>זה בדיקה עבורנו</h1>

      <DragFile />
    </div>
  );
}
