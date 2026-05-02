 "use client"

import DeleteData from "@/operation/delete"

 export default function DeletePage({ id }) {
    return(
        <button onClick={() => DeleteData(id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400">
            Delete
        </button>
    )
 }
 
   