import { FadeInUp, SlideInRight } from "@/components/custom/ScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/dummydata";

function FAQ() {
  return (
    <div>
      <div className="flex flex-col gap-6 items-center justify-center p-6 md:p-20 py-15 min-h-svh text-center relative">
        <FadeInUp>
          <p className="text-xl md:leading-[35px] max-w-[560px]">
            Frequently Asked Questions
          </p>
        </FadeInUp>
        <FadeInUp>
          <h2 className="title md:text-[64px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-semibold uppercase">
            Got Questions?
            <br />
            {"We've"} Got Answers!
          </h2>
        </FadeInUp>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto mt-4"
        >
          {faqs.map((faq, index) => (
            <SlideInRight key={index}>
              <AccordionItem
                value={`item-${index}`}
                className="border-white/4 text-base"
              >
                <AccordionTrigger>
                  <div className="flex items-center gap-6">
                    <span className="block">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-10">
                  <p className="text-start">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </SlideInRight>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FAQ;
