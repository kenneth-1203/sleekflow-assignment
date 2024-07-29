"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Contact, Location } from "@/lib/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {
  data: Contact;
};

const ContactInfo = ({ data }: Props) => {
  const [locationData, setLocationData] = useState<Location | null>(null);
  const [residentsData, setResidentsData] = useState<Contact[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const locationResponse = await fetch(`${data.location.url}`);
        const locationResults: Location = await locationResponse.json();

        const maxResidentsUrls = [...locationResults.residents.slice(0, 6)];
        const residentsResponses = await Promise.all(
          maxResidentsUrls.map((url) => fetch(url))
        );
        const residentsResults = await Promise.all(
          residentsResponses.map((response) => response.json())
        );

        setResidentsData(residentsResults);
        setLocationData(locationResults);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const renderLocationData = useMemo(() => {
    if (!locationData || !residentsData) {
      return <Skeleton className="w-full h-20" />;
    }
    return (
      <>
        <h3 className="mb-2">{locationData.name}</h3>
        <div className="flex gap-4">
          {residentsData.map((resident, index) => (
            <Link href={`/contacts/${resident.id}`} key={index}>
              <Avatar>
                <AvatarImage src={resident.image} />
              </Avatar>
            </Link>
          ))}
        </div>
      </>
    );
  }, [locationData, residentsData]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Personal Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex">
            <div className="w-40 font-medium">Status</div>
            <div className="flex-1">{data.status}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Gender</div>
            <div className="flex-1">{data.gender}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Species</div>
            <div className="flex-1">{data.species}</div>
          </div>
          <div className="flex">
            <div className="w-40 font-medium">Location</div>
            <div className="flex-1">{renderLocationData}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfo;
