/* eslint-disable @typescript-eslint/no-explicit-any */

/*
super simple fetcher to provide basic feature
*/
export default async function fetcher<JSON = any>(
   input: RequestInfo,
   init?: RequestInit
): Promise<JSON> {
   const res = await fetch(input, init);

   if (!res.ok) {
      // Handle HTTP errors
      const error = new Error('An error occurred while fetching the data.');
      // Attach extra info to the error object.
       (error as any).info = await res?.json();
      (error as any).status = res?.status;

      console.error(`Fetcher response not ok: ${res}`, error);
      throw error;
   }

   return res.json();
}
