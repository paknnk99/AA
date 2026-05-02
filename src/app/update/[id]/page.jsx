import UpdatePage from "@/app/updatedata"
import GetsingleData from "@/operation/update"





export default async function GetId({params}){
    if(!params.id){
        return <div>id is required</div>
    }
    const data = await GetsingleData(params.id)
    if(!data){
        return <div>Data is not found</div>
    }
    return(
       <UpdatePage  data={data}/>
    )

}