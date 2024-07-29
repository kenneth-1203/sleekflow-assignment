import { Metadata } from "next";
import Error from "@/components/custom/error";
import { Separator } from "@/components/ui/separator";
import type { Contact, DataError, DataResponse } from "@/lib/types";
import { CLIENT_BASE_URL } from "@/lib/constants";
import ContactsTable from "./_components/contacts-table";

const getContacts = async (
  page: string
): Promise<DataResponse<Contact> | DataError> => {
  const response = await fetch(`${CLIENT_BASE_URL}/api/contacts?page=${page}`);
  return response.json();
};

interface Props {
  searchParams: {
    page: string;
  };
}

export const metadata: Metadata = {
  title: 'Contact List - SleekFlow',
  description: 'View our list of contacts with their related information.',
}

export default async function Page({ searchParams }: Props) {
  const currentPage = searchParams.page;
  const data = await getContacts(currentPage);

  if ("error" in data) return <Error statusCode={500} message={data.error} />;

  return (
    <main className="max-w-7xl mx-auto">
      <div className="my-20 mx-4 space-y-4">
        <h1 className="text-4xl font-bold">Contacts</h1>
        <Separator />
        <ContactsTable
          contacts={data.results}
          totalPages={data.info.pages}
          currentPage={Number(currentPage) || 1}
        />
      </div>
    </main>
  );
}
