import * as TabsPrimitive from '@radix-ui/react-tabs';

const Tabs = (props: TabsPrimitive.TabsProps) => {
  return <TabsPrimitive.Root {...props}/>;
}

Tabs.List = TabsPrimitive.List;
Tabs.Trigger = TabsPrimitive.Trigger;
Tabs.Content = TabsPrimitive.Content;

export default Tabs;