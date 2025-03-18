import Image from 'next/image'

function Hero() {
  return (
    <section className="relative w-full mt-[73px] pt-8 px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-73.09px)]">
      {/* Left Content */}
      <div className="lg:w-1/2 text-center lg:text-left flex flex-col justify-center">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Find your perfect job in <br className="hidden md:block" /> the tech Industry
        </h1>
        <p className="mt-4 text-gray-600 max-w-md mx-auto lg:mx-0">
          Lorem ipsum dolor sit amet consectetur. Accumsan quis amet elementum est sed urna lectus dictum sagittis.
        </p>
        
        {/* Search Bar */}
        <div className="mt-6 flex items-center justify-center lg:justify-start bg-gray-100 rounded-full shadow-md p-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search for a Job"
            className="flex-grow px-4 py-2 text-gray-700 bg-transparent focus:outline-none"
          />
          <button className="bg-black text-white px-6 py-2 rounded-full">Search</button>
        </div>
        
        <p className="mt-2 text-sm text-gray-500">
          <span className="font-semibold">Popular Search:</span> Software Developer, UI/UX Designer, Product Manager
        </p>
        
        {/* Trusted Companies */}
        <TrustedCompanies />
      </div>
      
      {/* Right Content - 4 Circles with Images */}
      <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px] mt-10 lg:mt-0 flex items-center justify-center">
        <div className="absolute w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border border-gray-300 shadow-md top-0 left-1/2 transform -translate-x-1/2">
          <Image src="/job1.png" alt="Job Image 1" layout="fill" objectFit="cover" />
        </div>
        <div className="absolute w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border border-gray-300 shadow-md right-0 top-1/2 transform -translate-y-1/2">
          <Image src="/job2.png" alt="Job Image 2" layout="fill" objectFit="cover" />
        </div>
        <div className="absolute w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border border-gray-300 shadow-md left-0 top-1/2 transform -translate-y-1/2">
          <Image src="/job3.png" alt="Job Image 3" layout="fill" objectFit="cover" />
        </div>
        <div className="absolute w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border border-gray-300 shadow-md bottom-0 left-1/2 transform -translate-x-1/2">
          <Image src="/job4.png" alt="Job Image 4" layout="fill" objectFit="cover" />
        </div>
      </div>
    </section>
  )
}

const TrustedCompanies = () => {
    return (
      <div className="mt-6">
        <p className="text-gray-600 font-semibold">Trusted by 5k+ companies</p>
        <div className="flex items-center space-x-6 mt-2">
          <Image src="/meta.png" alt="Meta" width={50} height={50} />
          <Image src="/slack.png" alt="Slack" width={50} height={50} />
          <Image src="/booking.png" alt="Booking.com" width={50} height={50} />
        </div>
      </div>
    );
  };

export default Hero