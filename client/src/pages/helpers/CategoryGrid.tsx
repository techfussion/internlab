import { icons } from "@/global/imageUtil";

interface CategoryItem {
    img: string;
    name: string;
  }
  
  
export const CategoryGrid: React.FC<{ categories: CategoryItem[] }> = ({ categories }) => (
    <div className="flex flex-wrap gap-2 mt-5">
      {categories.map((item, index) => (
        <div
          key={index}
          className="flex flex-col my-5 p-4 border w-56 cursor-pointer hover:scale-105 transition-transform"
        >
          <img src={item.img} alt={`${item.name} icon`} className="w-8" />
          <h4 className="font-semibold text-base text-midnight_blue-500 mt-3 mb-2">
            {item.name}
          </h4>
          <div className="flex gap-2">
            <p className="text-xs opacity-50">Explore category</p>
            <img src={icons.arrowRight} alt="arrow" className="w-2" />
          </div>
        </div>
      ))}
    </div>
  );