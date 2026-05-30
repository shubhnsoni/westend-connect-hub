import Header from "@/components/Header";
import Footer from "@/components/Footer";

import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { useTranslation } from "@/hooks/useTranslation";

const defaultFaqCategories = [
  {
    title: "About WECA",
    items: [
      { q: "What is the West End Civic Association?", a: "WECA is a volunteer-run organization representing residents of Rockville's historic West End neighborhood. We advocate for community interests, organize events, and serve as a liaison between residents and local government." },
      { q: "Who can join WECA?", a: "Any one above the age of 18 who lives within the boundaries of the West End Civic Association is a member." },
      { q: "How are decisions made?", a: "Decisions are made through open discussion and voting at monthly meetings. All residents in attendance have a voice. The elected board oversees day-to-day operations between meetings." },
      { q: "What has WECA accomplished?", a: "WECA has successfully advocated for traffic calming measures, organized community clean-ups and festivals, provided input on development proposals, and maintained communication channels to keep residents informed." },
    ],
  },
  {
    title: "Meetings",
    items: [
      { q: "When and where do meetings happen?", a: "WECA meets the second Thursday of each month from September through May at 7:00 PM at the Rockville Memorial Library, 21 Maryland Ave, Rockville, MD 20850." },
      { q: "Can I attend on Zoom?", a: "Yes! Meetings are held in a hybrid format. A Zoom link is posted the morning of each meeting on our website and social media channels." },
      { q: "What topics are discussed at meetings?", a: "Topics include development updates, city planning and zoning, community safety, upcoming events, neighborhood maintenance, and any issues raised by residents." },
      { q: "Where can I find past meeting minutes?", a: "Meeting minutes are published on our website under Resources → Archives after they are approved at the following month's meeting." },
    ],
  },
  {
    title: "Getting Involved",
    items: [
      { q: "How can I volunteer?", a: "Visit our Volunteer Sign-Up page at /get-involved/volunteer to share your interests and availability. We need help with event planning, communications, clean-ups, and more." },
      { q: "How can I donate to WECA?", a: "WECA accepts donations via Zelle. Visit our Support page for details. All contributions go directly toward community events and initiatives." },
      { q: "Can I submit a community event?", a: "Yes! Reach out via our Contact page with your event details. Community-submitted events are reviewed and posted by our team." },
    ],
  },
  {
    title: "Neighborhood",
    items: [
      { q: "How do I report a zoning or development concern?", a: "You can use our Report an Issue form on the Get Involved page, or contact the City of Rockville's Department of Community Planning and Development Services directly at 240-314-8200." },
      { q: "How do I report a pothole, streetlight, or other infrastructure issue?", a: "Use the City of Rockville's SeeClickFix app or call 240-314-8567. You can also report it through our website and we'll help route it to the right department." },
      { q: "Is the West End a historic district?", a: "Yes, the West End is one of Rockville's oldest neighborhoods with homes dating back to the early 1900s. While not all properties are individually designated, the area has significant historic character." },
    ],
  },
  {
    title: "Resources",
    items: [
      { q: "Where can I find WECA's charter and bylaws?", a: "Our charter and bylaws are available on the Resources page under WECA Documents." },
      { q: "How do I access past newsletters?", a: "Visit the News & Updates section of our website. Newsletter archives are available in both blog and PDF format." },
      { q: "Who do I contact at City Hall?", a: "Visit our City Services resource page for a directory of key contacts including the Mayor's office, police non-emergency line, public works, and code enforcement." },
    ],
  },
];

const FAQ = () => {
  const { getContent, getJSON } = usePageContent('faq');
  const { t } = useTranslation();

  const heroTitle = getContent('hero_title', 'Frequently Asked Questions');
  const heroSubtitle = getContent('hero_subtitle', 'Find answers to common questions about WECA and the West End neighborhood.');
  const faqCategories = getJSON('categories', defaultFaqCategories);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category: any) =>
      category.items.map((item: any) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };

  return (
    <>
      <SEO
        title="FAQ - WECA"
        description="Frequently asked questions about the West End Civic Association, meetings, volunteering, and neighborhood resources."
        keywords="FAQ, questions, WECA, West End, Rockville, meetings, volunteer"
        canonicalUrl="https://westendrockvillemd.org/get-involved/faq"
        jsonLd={faqSchema}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20" />

        <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t(heroTitle)}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t(heroSubtitle)}
            </p>
          </div>
        </section>

        <main className="flex-1 py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl space-y-10">
            {faqCategories.map((category: any) => (
              <div key={category.title}>
                <h2 className="text-2xl font-bold text-foreground mb-4">{t(category.title)}</h2>
                <Accordion type="single" collapsible className="border rounded-xl overflow-hidden">
                  {category.items.map((item: any, i: number) => (
                    <AccordionItem key={i} value={`${category.title}-${i}`}>
                      <AccordionTrigger className="px-5 text-left text-base font-medium">
                        {t(item.q)}
                      </AccordionTrigger>
                      <AccordionContent className="px-5 text-muted-foreground text-base leading-relaxed">
                        {t(item.a)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQ;
