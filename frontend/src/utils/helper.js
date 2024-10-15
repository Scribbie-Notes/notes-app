export const validateEmail = (email) =>{
    if(!email || email.trim()===''){
        return ({valid:false , error :"Email is required"})
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return ({valid:false , error :"Invalid Email format"}) 
    }

    return ({valid : true})
}

export const validateName = (name) => {
    if(!name || name.trim()===''){
        return ({valid:false , error :"Name is required"})
    }
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/
    if(!nameRegex.test(name)){
        return ({valid:false , error :"Invalid Name format"}) 
    }

    return ({valid : true})
}

export const validatePassword = (password) =>{
    if(!password || password.trim()===''){
        return ({valid:false , error:"Password is required"})
    } 
    if(!/[A-Z]/.test(password)){
        return ({valid:false , error:"Password must include atleast one Uppercase letter"})
    }
    if(!/[a-z]/.test(password)){
        return ({valid:false , error:"Password must include atleast one Lower letter"})
    }
    if(!/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/.test(password)){
        return ({valid:false , error:"Password must include atleast one special character"})
    }
    if(!(password.length >= 8)){
        return ({valid:false , error:"Min password length should be 8"})
    }

    return ({valid:true})
    
}


export const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");
    let initials = "";

    if (words.length > 0) {
        initials += words[0][0]; // First initial
    }
    
    if (words.length > 1) {
        initials += words[1][0]; // Second initial, if available
    }

    return initials.toUpperCase();
}
