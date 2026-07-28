import { useState } from "react";
import NoteTab from "../../../components/shared/NoteTab";

export default function AboutUs() {
    const [conten,setContent] = useState('');
  return (
    <div>
      <NoteTab
      content={conten}
      handleContentChange={setContent}
      />
    </div>
  )
}
