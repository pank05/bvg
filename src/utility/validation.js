export const checkIfEmpty = (field)=>{
    let message = '';
    let status = false;
    if(!field || field === ''){
    message:`${field} value can't be empty `;
    status:true;
    }
    return {message,status};
}