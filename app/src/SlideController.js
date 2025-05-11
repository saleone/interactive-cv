export default function SlideController({children}) {
  // Change the background color of every other child
  console.log(children, typeof children);
  let to_render = children.map((child, index) => {
    let bg = index % 2 === 0 ? "bg-white" : "bg-blue";
    return (
      <div className="{bg}">
        {child}
      </div>
    )
  });

  return (
    <div className="wrap">
      { to_render }
    </div>
  )
};

