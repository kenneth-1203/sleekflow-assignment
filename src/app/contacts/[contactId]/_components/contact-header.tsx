"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
  imageSrc: string;
};

const ContactHeader = ({ name, imageSrc }: Props) => {
  const getInitials = () => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <div className="flex gap-8 items-center">
      <Avatar className="w-32 h-32">
        <AvatarImage src={imageSrc} />
        <AvatarFallback className="font-medium text-5xl">
          {getInitials()}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-bold">{name}</h1>
    </div>
  );
};

export default ContactHeader;
