import vodafone from "@/assets/logo/vodafone-2017-logo.svg";
import intel from "@/assets/logo/intel-3.svg";
import tesla from "@/assets/logo/tesla-9 1.svg";
import amd from "@/assets/logo/amd-logo-1.svg";
import talkit from "@/assets/logo/talkit 1.svg";

interface CompanyLogo {
    src: string;
    alt: string;
    width: string;
  }
  
export const CompanyLogos: React.FC = () => {
    const logos: CompanyLogo[] = [
      { src: vodafone, alt: "Vodafone logo", width: "w-32" },
      { src: intel, alt: "Intel logo", width: "w-16" },
      { src: tesla, alt: "Tesla logo", width: "w-28" },
      { src: amd, alt: "AMD logo", width: "w-16" },
      { src: talkit, alt: "Talkit logo", width: "w-16" }
    ];
  
    return (
      <section className="px-16 pb-10">
        <p className="my-7 text-xs opacity-50">
          Some of the companies we connect you with
        </p>
        <div className="flex justify-between">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className={logo.width}
            />
          ))}
        </div>
      </section>
    );
  };