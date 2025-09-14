
export const formatLocalDate = (date: Date) => {
   return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
   });
};