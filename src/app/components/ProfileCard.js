"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, Button, Tooltip } from "@material-tailwind/react";
import { useState } from "react";

export default function ProfileCard({ user }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const imageSrc =
    user.image && user.image.trim() !== ""
      ? user.image
      : "/default-profile.png";

  const handleCardClick = () => {
    router.push(`/${user.username}`);
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    const profileURL = `${window.location.origin}/?u=${user.username}`;
  
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(profileURL).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => alert("Failed to copy"));
    } else {
      
      const textArea = document.createElement("textarea");
      textArea.value = profileURL;
      textArea.style.position = "fixed";  // avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert("Failed to copy");
      }
      document.body.removeChild(textArea);
    }
  };
  

  return (
    <Card
      onClick={handleCardClick}
       className="w-72 lg:w-80 xl:w-72 xl:h-70 lg:h-72 flex items-center justify-between sm:flex-col sm:justify-center p-1 rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-yellow-200/40 dark:hover:shadow-green-200/30 bg-[linear-gradient(to_top_right,rgba(250,204,21,0.7),rgba(34,197,94,0.7))] backdrop-blur-md"
     >
      {/* Profile Image */}
      <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <Image
          src={imageSrc}
          alt="Profile"
          fill
          className="object-cover rounded-full"
        />
      </div>
      <div className="mt-4">
      {/* Share Button */}
      <Tooltip content={copied ? "Copied!" : "Copy to clipboard"}>
        <Button
          variant="outlined"
          onClick={handleCopy}
          size="sm"
          className="text-black mt-2 px-4 py-2 text-xs rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform"
          >
          Share Profile
        </Button>
      </Tooltip>
      </div>
    </Card>
  );
}
