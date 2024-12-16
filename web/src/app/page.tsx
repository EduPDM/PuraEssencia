import NavBar from '@/components/navBar'
import Item from '@/components/item';



export default function Home() {

  
  return (
    <>
      <NavBar/>
    
      <section className='w-full flex justify-center px-2 md:px-12 bg-zinc-900 pt-4'>
        <div className='grid grid-cols-2 gap-4 w-full max-w-screen-xl'>
          <Item />
        </div>
      </section>
    </>
  );
}
