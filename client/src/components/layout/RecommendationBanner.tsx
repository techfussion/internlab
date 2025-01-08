import { Button } from "../ui/button";

const RecommendationBanner: React.FC = () => (
    <section className="px-16 mt-8 pb-10">
      <div className="bg-purple-500 flex py-10 h-96 items-center justify-evenly">
        <div className="text-white-500">
          <h2 className="text-4xl leading-tight font-bold">
            Recommend <br />placements easily
          </h2>
          <p className="text-xs my-4 w-6/12 font-thin">
            Recommend companies that are not available in our database, rate, and
            leave feedback for others.
          </p>
          <Button className="rounded-none bg-white-500 text-xs text-purple-500">
            Recommend Now
          </Button>
        </div>
        <img
          className="relative right-0"
          src="https://picsum.photos/200/300"
          alt="recommendation banner"
        />
      </div>
    </section>
  );

  export default RecommendationBanner;