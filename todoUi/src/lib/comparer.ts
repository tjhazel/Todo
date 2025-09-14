
export const dateComparer = (
   a: Date,
   b: Date,
): number => {
   if (a === null || a === undefined) return -1;
   if (b === null || b === undefined) return 1;

   if (a < b) return -1
   if (a > b) return 1
   return 0
};