

export default function SubscribeModal({record}:{record:{email:string,createdAt:string}}) {
    // console.log(record);
    
  return (
    <div>
      <div>
        <h1>Email : <a href={"mailto:"+record?.email}>{record?.email}</a></h1>
        <p>Date : {new Date(record?.createdAt!).toDateString()}</p>
      </div>
    </div>
  )
}
