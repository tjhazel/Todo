import { mutate } from "swr";

export const swrOptions = {
   refreshInterval: 0,
   revalidateOnFocus: false,
   dedupingInterval: 60000,
};

/*
 //mutate keys where the key is in array format, like so:
   const { data, isValidating, error } = useSWR<PagedList<EnrollmentStatusSearchResult>, HttpError>(
      [enrollmentStatusSearchUrl, params], //<--first parameter is a string
      fetcher,
      swrOptions
   );
*/
export const mutateKeysLike = (baseKey: string) => {

   //mutate specific keys with matcher - results in no api calls
   if (baseKey) {
      mutate(
         key => {
            if (Array.isArray(key) && typeof key[0] === 'string') {
               return Array.isArray(key) && key[0].indexOf(baseKey) > -1
            }
            return typeof key === 'string' && key.indexOf(baseKey) > -1
         },
         undefined,
         { revalidate: true }
      )
   }
}
