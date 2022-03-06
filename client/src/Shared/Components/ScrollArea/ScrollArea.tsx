import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

const ScrollArea = (props: ScrollAreaPrimitive.ScrollAreaProps) => {
  return <ScrollAreaPrimitive.Root {...props}/>
}

ScrollArea.Viewport = ScrollAreaPrimitive.Viewport;
ScrollArea.Scrollbar = ScrollAreaPrimitive.Scrollbar;
ScrollArea.Thumb = ScrollAreaPrimitive.Thumb;
ScrollArea.Corner = ScrollAreaPrimitive.Corner;

export default ScrollArea;