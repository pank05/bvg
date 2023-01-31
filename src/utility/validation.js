export const checkIfEmpty = (field)=>{
    let message = '';
    let status = false;
    if(!field || field === ''){
    message = `${field} value can't be empty `;
    status=true;
    }
    return {message,status};
}


export const checkUserHasRole = (userInfo={},role=[]) =>{
    if(userInfo?.roles){
       return userInfo.roles.some((v)=>role.includes(v.label))
    }
    return false;
}