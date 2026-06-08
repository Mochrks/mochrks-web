import { BehanceCards } from "@/components/ui/behance-cards";
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import { FlipLinkTitle } from "@/components/demo/Title";
import { cards } from "@/apis/uiux";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import SEO from "@/components/demo/SEO";

export default function index() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-[#0F1215]">
      <SEO
        title="Moch. Rizki Kurniawan  | UI/UX Design Portfolio"
        description="Explore beautiful, intuitive, and user-centric UI/UX case studies, interactive wireframes, web designs, and mobile prototypes created by Moch. Rizki Kurniawan (@mochrks)."
        keywords="Moch. Rizki Kurniawan, UI/UX portfolio, user interface design, user experience design, mobile design, Figma prototypes, web design, mochrks"
        path="/ui-ux-design"
      />
      <div className="flex flex-col place-content-center gap-2 bg-white px-8 py-14 lg:py-24 ">
        <div className="text-black">
          <FlipLinkTitle>DESIGN</FlipLinkTitle>
          <FlipLinkTitle>UI/UX.</FlipLinkTitle>
        </div>
        <div>
          <InteractiveHoverButton
            onClick={() => navigate("/")}
            className="text-sm md:text-lg xs font-medium mt:2"
          >
            Back
          </InteractiveHoverButton>
        </div>
      </div>

      <div className="w-full h-full px-4 py-8 md:px-6 md:py-12 lg:px-20 lg:py-16 bg-[#0F1215]">
        <BehanceCards cards={cards} />
      </div>

      <ScrollToTopButton />

      {/* <div className="flex justify-center py-20 bg-[#0F1215]">
        <InteractiveHoverButton onClick={() => navigate("/")} className="text-lg font-medium">
          Back to Previous Page
        </InteractiveHoverButton>
      </div> */}
    </div>
  );
}
