import { Metadata } from "next";
import { CLIENT_BASE_URL } from "@/lib/constants";
import type { Contact, DataError } from "@/lib/types";
import Error from "@/components/custom/error";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ContactHeader from "./_components/contact-header";
import ContactInfo from "./_components/contact-info";
import ContactEpisodes from "./_components/contact-episodes";

const getContactDetails = async (id: string): Promise<Contact | DataError> => {
  const response = await fetch(`${CLIENT_BASE_URL}/api/contact?id=${id}`);
  return response.json();
};

type Props = {
  params: {
    contactId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const contactId = params.contactId;
  const contact = await getContactDetails(contactId);

  if ("error" in contact)
    return {
      title: "Error",
      description: contact.error,
    };

  return {
    title: `${contact.name} - SleekFlow`,
    description: `View information about ${contact.name}`,
  };
}

export default async function Page({ params }: Props) {
  const contactId = params.contactId;
  const data = await getContactDetails(contactId);

  if ("error" in data) return <Error statusCode={500} message={data.error} />;

  return (
    <main className="max-w-7xl mx-auto">
      <div className="my-20 space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Contacts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ContactHeader name={data.name} imageSrc={data.image} />
        <Separator />
        <ContactInfo data={data} />
        <ContactEpisodes episodes={data.episode} />
      </div>
    </main>
  );
}
