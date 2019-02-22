



export const getUrlParam = param=>{
    const urlParams = getUrlParams();
    return urlParams.get(param);
}

export const getUrlParams = ()=>(
   new URLSearchParams(window.location.search)
    )