// @ts-nocheck

export default async(e,t={})=>{const c=document.createElement("a");c.download=t.fileName||"Untitled",c.href=URL.createObjectURL(e),c.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(c.href),3e4)}),c.click()};
