import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

export const databases = new Databases(client);

export const storage = new Storage(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("647465b9ed08f84b4406");

export const account = new Account(client);

export const addFile = async (
  id: string,
  name: string,
  path: string,
  email: string
) => {
  await databases.createDocument(
    "64748082e458885cc1dd",
    "64748089ef99c41ad0b2",
    id,
    { file: [id, name, path, "No", email] }
  );
};

export const creatingFolder = async (
  name: string,
  path: string,
  email: string
) => {
  await databases.createDocument(
    "64748082e458885cc1dd",
    "64748089ef99c41ad0b2",
    crypto.randomUUID(),
    { folder: [name, path, email] }
  );
};

export const deleteDocument = async (id: any) => {
  await databases.deleteDocument(
    "64748082e458885cc1dd",
    "64748089ef99c41ad0b2",
    id
  );
};

export const updateDocument = async (
  id: string,
  name: string,
  path: string,
  isFavourite: string,
  email: string
) => {
  await databases.updateDocument(
    "64748082e458885cc1dd",
    "64748089ef99c41ad0b2",
    id,
    { file: [id, name, path, isFavourite, email] }
  );
};
