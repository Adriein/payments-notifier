import * as RadixAccordion from '@radix-ui/react-accordion';

const Accordion = ({ children }: any) => {
  return (
    <>
      {children}
    </>
  );
}

Accordion.Root = RadixAccordion.Root;
Accordion.Item = RadixAccordion.Item;
Accordion.Header = RadixAccordion.Header;
Accordion.Trigger = RadixAccordion.Trigger;
Accordion.Content = RadixAccordion.Content;

export default Accordion;

