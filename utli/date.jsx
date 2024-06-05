export const getFormattedDate = (date)=>{
        let dt = new Date(date);
         return dt.toISOString().slice(0,10) ;
}

export function getDateMinusDays(date, days){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}