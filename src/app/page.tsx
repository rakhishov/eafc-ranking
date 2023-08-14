import Image from 'next/image'
import Footer from '@/components/ui/footer'
export default function Home() {
  return (
    //mx-auto max-w-7xl px-2 sm:px-6 lg:px-8
    //grid max-md:grid-cols-1 grid-cols-2 gap-10 lg:w-3/5 lg lg:m-auto p-6 
    <>
    <div className='grid max-[1075px]:grid-cols-1 pt-6 pb-2 grid-cols-2 gap-10 mx-auto max-w-7xl sm:px-10 px-5 lg:px-8'>
      <div className='flex flex-col justify-center'>
        <h2 className='pb-2 text-[36px] font-bold leading-[36px]'>What&apos;s this?</h2>
        <p className='mb-2'> 
        Are you tired of the absence of a comprehensive ranking system for FIFA players in Kazakhstan? Look no further! We present to you the cutting-edge Kazakhstan FIFA Rankings App, meticulously designed to empower tournament organizers, players, and enthusiasts alike.
        </p>
        <p className='mb-2'> <span className='font-bold'>📈 Real-Time Tracking:</span> Stay up to date with the latest ranking changes as they happen. Our app offers real-time updates, allowing you to witness the dynamic shifts in the player hierarchy. Whether you&apos;re climbing the ranks or defending your position, you&apos;ll always be in the know.</p>
        <p> <span className='font-bold'>⚽ Elevate Player Rankings:</span> Players, this is your chance to shine on the virtual pitch! The app provides a fair and unbiased assessment of your skills, enabling you to track your progress and stand out among competitors. Your hard-earned victories and dedication will finally reflect accurately in your ranking.</p>  
      </div>
      <div className='flex max-[1075px]:justify-center'>
        <Image src='https://pbs.twimg.com/media/F1VwTGTWABw2t4U.jpg'
          width={500}
          height={500}
          alt='fifa-photo'
        />
      </div>
      <div className='md: order-2'>
        <h2 className='pb-2 text-[36px] font-bold leading-[36px]'>How points are calculated?</h2>
        <p className="mb-2">
          The FIFA Ranking uses the ELO rating system to calculate the relative strength of players.
          ELO is a widely adopted method that considers the outcome of matches and the strength of opponents to adjust rankings.
        </p>
        <p className="mb-2">
          Each player starts with an initial ELO rating of 1000. When two teams face off, the expected outcome is determined based on their ratings.
          So it&apos;s quite simple, if lower-rated player wins, he gains more points, whereas a higher-rated player gains fewer points for a win. A draw leads to points being shared.
        </p>
      </div>
      <div className='flex max-[1075px]:justify-center'>
        <Image src='https://www.ggrecon.com/media/p31fnl2h/easfc-24-jude-bellingham.jpg'
          width={500}
          height={250}
          alt='fifa-photo'
        />
      </div>
    </div>
    <Footer/>
    </>
  )
}
