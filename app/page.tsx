import { getServerSession } from 'next-auth'
import { authOptions } from './utils/options';
import { redirect } from 'next/navigation';


export default async function Home() {

  const session = await getServerSession(authOptions)

  if(!session){
    return redirect("/login")
  }else{
    return redirect('/home')
  }

  return  (
    <div>
      <h1>{session?.user?.name}</h1>
      <img src={session?.user?.image} alt="user image" />
    </div>
  );
}
