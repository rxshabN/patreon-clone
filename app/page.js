import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center text-white flex-col md:h-[44vh] h-[38vh] text-sm md:text-base items-center gap-5 px-5 md:px-0">
        <div className="font-bold md:text-5xl text-3xl text-center">
          Your support is appreciated!
        </div>
        <p className="text-center md:text-center">
          A crowdfunding platform for creators. Get funded by your fans and
          followers.
        </p>
        <div>
          <Link href="/getstarted">
            <button
              type="button"
              className="mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
            >
              Click here to get started
            </button>
          </Link>
        </div>
      </div>
      <div className="h-0.5 bg-white opacity-15"></div>
      <div className="text-white container mx-auto md:py-16 px-10 py-6">
        <h1 className="text-xl text-center md:mb-14 mb-4">
          Your fans can support you by donating to your cause/activities through
          this website.
        </h1>
        <div className="flex gap-5 justify-around items-center">
          <div className="item space-y-3 flex flex-col items-center">
            <Image
              src="/stacks-of-dollar-coins-illustrations-gold-dollar-coin-vector-removebg-preview.png"
              alt="Illustration of a coin"
              width={100}
              height={100} // Specify height for optimization
              className="dollar rounded-full p-2"
            />
            <p className="text-center">Fund your favourite creators</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center">
            <Image
              src="/5329101.png"
              alt="Illustration of a coin"
              width={100}
              height={100} // Specify height for optimization
              className="dollar p-2"
            />
            <p className="text-center">Increase your growth</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center">
            <Image
              src="/group-happy-smiling-people-looking-up-top-view-white-background-flat-vector-illustration_1284-78599.avif"
              alt="Illustration of happy people"
              width={100}
              height={100} // Specify height for optimization
              className="dollar rounded-full p-2"
            />
            <p className="text-center">Your fans want to help</p>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "Patreon Clone",
};
