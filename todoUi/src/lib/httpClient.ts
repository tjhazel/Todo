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

/*
To implement a TypeScript HTTP fetcher for SWR, you typically define an asynchronous function that takes the SWR key (often a URL or an array containing the URL and other parameters) and returns a Promise resolving to the fetched data. This function can use the native fetch API or a library like Axios. 
Here's an example using the native fetch API: 
// fetcher.ts
export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    // Handle HTTP errors
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    // (error as any).info = await res.json();
    // (error as any).status = res.status;
    throw error;
  }

  return res.json();
}

Then, you can use this fetcher with useSWR in your React components: 
// MyComponent.tsx
import useSWR from 'swr';
import fetcher from './fetcher'; // Assuming fetcher.ts is in the same directory

interface User {
  id: string;
  name: string;
  email: string;
}

export function MyComponent() {
  const { data, error } = useSWR<User, Error>('/api/user', fetcher);

  if (error) return <div>Failed to load user.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {data.name}!</h1>
      <p>Email: {data.email}</p>
    </div>
  );
}

Explanation: 

• fetcher.ts: 
	• Defines an async function fetcher that takes RequestInfo (like a URL string) and optional RequestInit (for method, headers, body, etc.) as arguments. 
	• It uses fetch to make the HTTP request. 
	• It checks for res.ok to handle non-2xx HTTP responses and throws an error if the request was unsuccessful. 
	• It parses the response as JSON and returns it. 
	• The JSON = any generic provides a default type for the returned data, but it's best to explicitly type it when using useSWR. 

• MyComponent.tsx: 
	• Imports useSWR from swr and your custom fetcher. 
	• Defines an interface User to strongly type the expected data. 
	• Calls useSWR with the API endpoint (/api/user) as the key and the fetcher function. 
	• Uses TypeScript generics (&lt;User, Error&gt;) with useSWR to specify the expected data type (User) and error type (Error). This provides type safety for data and error. 
	• Handles loading and error states based on data and error from useSWR. 

AI responses may include mistakes.


*/