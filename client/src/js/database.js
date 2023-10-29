import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

// export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (content) => {
  console.log("PUT to the database");
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  // Use the `put` method to add or update a record in the object store
  const request = store.put({ content });
  // await store.put({ content });
  const result = await request;

  // await tx.done;
  console.log("Data added to the database.", result);
};

// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error("getDb not implemented");
export const getDb = async () => {
  console.log("GET all from the database");
  const db = await openDB("jate", 1);
  const store = db.transaction("jate").objectStore("jate");
  // const tx = db.transaction("jate", "readonly");
  // const store = tx.objectStore("jate");
  // Use the `getAll` method to retrieve all records from the object store
  const allData = await store.getAll();
  // const request = store.getAll();
  // const result = await request;

  return allData.map((item) => item.content);
  // console.log("result.value", result);
  // return result;
};

initdb();
