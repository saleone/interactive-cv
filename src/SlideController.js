import { Children } from 'react';

export default function SlideController({children}) {
  // Change the background color of every other child
  console.log(children, typeof children);

  let all_children = Children.toArray(children);
  let to_render = all_children.map((child, i) => {
    let bg = i % 2 === 0 ? "bg-white" : "bg-blue";
    return (
      <div key={i} className={bg}>
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

